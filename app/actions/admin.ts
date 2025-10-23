'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAllMatchDays() {
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
    .order('date', { ascending: false })
    .order('time', { ascending: false })

  if (error) throw error
  return data
}

export async function getStatistics() {
  const supabase = await createClient()

  // Get all completed match days (not cancelled, in the past)
  const { data: matchDays, error: matchDaysError } = await supabase
    .from('match_days')
    .select(`
      *,
      location:locations(*),
      registrations(
        *,
        profile:profiles(*)
      )
    `)
    .eq('cancelled', false)
    .lt('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: false })

  if (matchDaysError) throw matchDaysError

  // Calculate statistics
  const totalMatchDays = matchDays.length

  // Count registrations per player
  const playerStats: Record<string, {
    name: string
    count: number
    bibs: number
    keys: number
  }> = {}

  matchDays.forEach(matchDay => {
    matchDay.registrations?.forEach(reg => {
      if (!playerStats[reg.user_id]) {
        playerStats[reg.user_id] = {
          name: reg.profile?.full_name || 'Onbekend',
          count: 0,
          bibs: 0,
          keys: 0,
        }
      }
      playerStats[reg.user_id].count++
      if (reg.brings_bibs) playerStats[reg.user_id].bibs++
      if (reg.brings_key) playerStats[reg.user_id].keys++
    })
  })

  // Count matches per location
  const locationStats: Record<string, {
    name: string
    count: number
  }> = {}

  matchDays.forEach(matchDay => {
    if (matchDay.location) {
      if (!locationStats[matchDay.location_id]) {
        locationStats[matchDay.location_id] = {
          name: matchDay.location.name,
          count: 0,
        }
      }
      locationStats[matchDay.location_id].count++
    }
  })

  return {
    totalMatchDays,
    totalRegistrations: Object.values(playerStats).reduce((sum, p) => sum + p.count, 0),
    playerStats: Object.entries(playerStats)
      .map(([id, stats]) => ({ id, ...stats }))
      .sort((a, b) => b.count - a.count),
    locationStats: Object.entries(locationStats)
      .map(([id, stats]) => ({ id, ...stats }))
      .sort((a, b) => b.count - a.count),
  }
}
