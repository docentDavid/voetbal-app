# ⚽ Voetbal App

Een moderne, responsive webapplicatie voor het organiseren en beheren van voetbal speeldagen. Spelers kunnen zich eenvoudig aanmelden, aangeven of ze hesjes of de sleutel meenemen, en statistieken bekijken.

## ✨ Features

### Voor Spelers
- 🔐 **Authenticatie**: Veilig inloggen met email en wachtwoord
- 📅 **Speeldagen overzicht**: Zie alle aankomende speeldagen in één oogopslag
- ✅ **Aan/afmelden**: Meld je aan voor speeldagen en geef aan of je hesjes of sleutel meeneemt
- 📍 **Locatie informatie**: Bekijk locaties en navigeer erheen met één klik
- 👤 **Profiel**: Beheer je persoonlijke gegevens

### Voor Organisatoren
- ➕ **Speeldagen aanmaken**: Iedereen kan nieuwe speeldagen plannen
- ✏️ **Beheer**: Bewerk of annuleer speeldagen
- 📊 **Geschiedenis**: Overzicht van alle speeldagen (verleden en toekomst)
- 📈 **Statistieken**: Wie heeft waar gespeeld? Wie neemt vaak hesjes/sleutel mee?

### Technisch
- 🌓 **Dark mode**: Automatisch schakelen tussen light en dark mode
- 📱 **Responsive**: Werkt perfect op desktop, tablet en mobiel
- ⚡ **Real-time updates**: Wijzigingen zijn direct zichtbaar voor iedereen
- 🎨 **Modern design**: Mooie kleuren met goed contrast

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **TypeScript**: Voor type-veiligheid
- **Fonts**: Space Grotesk (headings) + Inter (body)

## 🛠️ Setup

### 1. Clone het project

\`\`\`bash
git clone <repository-url>
cd voetbal-app
\`\`\`

### 2. Installeer dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Supabase Project Setup

1. Ga naar [supabase.com](https://supabase.com) en maak een nieuw project aan
2. Ga naar **SQL Editor** in je Supabase dashboard
3. Kopieer de inhoud van `supabase-schema.sql` en voer deze uit
4. Dit maakt alle tabellen, RLS policies en triggers aan

### 4. Environment variabelen

1. Kopieer het voorbeeld bestand:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

2. Vul de Supabase credentials in (te vinden in je Supabase project onder Settings > API):
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   \`\`\`

### 5. Locaties configureren

Na het draaien van het schema SQL, update de 2 standaard locaties in Supabase:

1. Ga naar **Table Editor** > **locations**
2. Update de naam en adressen van de 2 locaties naar jouw eigen locaties

### 6. Team foto toevoegen (optioneel)

Plaats een foto van je team in `/public/team.jpg` om deze op de landing page te tonen.

### 7. Start de development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structuur

\`\`\`
voetbal-app/
├── app/
│   ├── actions/          # Server actions voor database operaties
│   │   ├── auth.ts       # Authenticatie
│   │   ├── match-days.ts # Speeldagen CRUD
│   │   └── admin.ts      # Admin functionaliteit
│   ├── admin/            # Admin pagina's
│   │   ├── geschiedenis/ # Alle speeldagen
│   │   └── statistieken/ # Statistieken & grafieken
│   ├── speeldagen/       # Speeldagen overzicht & detail
│   ├── info/             # Locatie informatie
│   ├── profiel/          # Gebruiker profiel
│   └── page.tsx          # Landing/login pagina
├── components/
│   ├── ui/               # Herbruikbare UI componenten
│   └── navigation.tsx    # Top nav (desktop) + bottom nav (mobile)
├── lib/
│   ├── supabase/         # Supabase client utilities
│   └── types/            # TypeScript type definities
└── supabase-schema.sql   # Database schema
\`\`\`

## 🎨 Design System

### Kleuren

- **Primary**: `#024554` (donker blauw-groen)
- **Secondary**: `#53736A` (medium grijs-groen)
- **Accent**: `#6A8C69` (medium groen)
- **Highlight**: `#A8B545` (lime groen)
- **Muted**: `#C2C0A6` (beige/taupe)

Dark mode kleuren worden automatisch aangepast voor optimaal contrast.

### Fonts

- **Headings**: Space Grotesk (modern, geometric)
- **Body**: Inter (clean, zeer leesbaar)

## 📊 Database Schema

### Tabellen

1. **profiles**: Gebruiker profielen (extends auth.users)
2. **locations**: Voetbal locaties
3. **match_days**: Geplande speeldagen
4. **registrations**: Wie is aangemeld voor welke speeldag

Alle tabellen hebben Row Level Security (RLS) enabled voor veiligheid.

## 🔒 Beveiliging

- Row Level Security (RLS) is ingeschakeld op alle tabellen
- Alleen geauthenticeerde gebruikers kunnen data bekijken/wijzigen
- Gebruikers kunnen alleen hun eigen registraties aanpassen
- Middleware checkt authentication status op alle protected routes

## 🚢 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Importeer het project in Vercel
3. Voeg environment variabelen toe:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Andere platforms

De app werkt op elk platform dat Next.js ondersteunt (Netlify, Railway, etc.).

## 🎯 Roadmap

Toekomstige features:

- 📧 Email notificaties (bij nieuwe speeldag, reminder voor aanmelden)
- 📸 Profielfoto's
- 🏆 Badges en achievements
- 📱 PWA support (installeerbaar als app)
- 💬 Chat/comments per speeldag
- 🔔 Push notificaties

## 🤝 Contributing

Pull requests zijn welkom! Voor grote wijzigingen, open eerst een issue om te bespreken wat je wilt veranderen.

## 📄 License

MIT

## 👨‍💻 Ontwikkeld met

- ❤️ Passie voor voetbal
- ⚡ Next.js en React
- 🎨 Tailwind CSS
- 🔥 Supabase
