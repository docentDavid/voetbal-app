-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Locations policies
CREATE POLICY "Anyone can view locations" ON locations
  FOR SELECT USING (true);

-- Insert default locations
INSERT INTO locations (name, address) VALUES
  ('Locatie 1', 'Adres 1 - update dit later'),
  ('Locatie 2', 'Adres 2 - update dit later');

-- Match days table
CREATE TABLE match_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  cancelled BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE match_days ENABLE ROW LEVEL SECURITY;

-- Match days policies
CREATE POLICY "Anyone authenticated can view match days" ON match_days
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone authenticated can create match days" ON match_days
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone authenticated can update match days" ON match_days
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone authenticated can delete match days" ON match_days
  FOR DELETE USING (auth.role() = 'authenticated');

-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_day_id UUID NOT NULL REFERENCES match_days(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  brings_bibs BOOLEAN DEFAULT false,
  brings_key BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(match_day_id, user_id)
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Registrations policies
CREATE POLICY "Anyone authenticated can view registrations" ON registrations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create own registration" ON registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registration" ON registrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own registration" ON registrations
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_match_days_updated_at BEFORE UPDATE ON match_days
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_match_days_date ON match_days(date);
CREATE INDEX idx_match_days_location ON match_days(location_id);
CREATE INDEX idx_registrations_match_day ON registrations(match_day_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);
