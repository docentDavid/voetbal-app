'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getMatchDays() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('match_days')
    .select(`
      *,
      location:locations(*),
      registrations(
        *,
        profile:profiles(*)
      )
    `)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) throw error
  return data
}

export async function getMatchDay(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('match_days')
    .select(`
      *,
      location:locations(*),
      registrations(
        *,
        profile:profiles(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createMatchDay(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Niet ingelogd')

  const matchDay = {
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    location_id: formData.get('location_id') as string,
    created_by: user.id,
  }

  const { error } = await supabase.from('match_days').insert(matchDay)

  if (error) throw error

  revalidatePath('/speeldagen')
  return { success: true }
}

export async function updateMatchDay(id: string, formData: FormData) {
  const supabase = await createClient()

  const updates = {
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    location_id: formData.get('location_id') as string,
    cancelled: formData.get('cancelled') === 'true',
  }

  const { error } = await supabase
    .from('match_days')
    .update(updates)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/speeldagen')
  revalidatePath(`/speeldagen/${id}`)
  return { success: true }
}

export async function deleteMatchDay(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('match_days')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/speeldagen')
  return { success: true }
}

export async function registerForMatchDay(matchDayId: string, data: {
  brings_bibs: boolean
  brings_key: boolean
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Niet ingelogd')

  const { error } = await supabase
    .from('registrations')
    .upsert({
      match_day_id: matchDayId,
      user_id: user.id,
      brings_bibs: data.brings_bibs,
      brings_key: data.brings_key,
    })

  if (error) throw error

  revalidatePath('/speeldagen')
  revalidatePath(`/speeldagen/${matchDayId}`)
  return { success: true }
}

export async function unregisterFromMatchDay(matchDayId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Niet ingelogd')

  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('match_day_id', matchDayId)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/speeldagen')
  revalidatePath(`/speeldagen/${matchDayId}`)
  return { success: true }
}

export async function getLocations() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}
