"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/speeldagen");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/speeldagen");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Niet ingelogd" };
  }

  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;

  if (!full_name || !email) {
    return { error: "Naam en e-mailadres zijn verplicht" };
  }

  try {
    // Update profile in profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name })
      .eq("id", user.id);

    if (profileError) {
      return { error: profileError.message };
    }

    // Update email in auth.users (this requires a separate call)
    const { error: authError } = await supabase.auth.updateUser({
      email: email,
    });

    if (authError) {
      return { error: authError.message };
    }

    revalidatePath("/profiel");
    return { success: true };
  } catch (error) {
    return {
      error: "Er is een fout opgetreden bij het bijwerken van je gegevens",
    };
  }
}
