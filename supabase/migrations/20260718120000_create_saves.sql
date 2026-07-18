-- Save slots for Erbsen-Chip Heist (anonymous player_key for now)
create table if not exists public.saves (
  id uuid primary key default gen_random_uuid(),
  player_key text not null unique,
  scene_id text not null,
  inventory jsonb not null default '[]'::jsonb,
  flags jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists saves_updated_at_idx on public.saves (updated_at desc);

alter table public.saves enable row level security;

-- MVP policies: anon key can read/write by player_key via API.
-- Tighten later with Supabase Anonymous Auth (auth.uid()).
drop policy if exists "anon_select_saves" on public.saves;
drop policy if exists "anon_insert_saves" on public.saves;
drop policy if exists "anon_update_saves" on public.saves;

create policy "anon_select_saves"
  on public.saves
  for select
  to anon
  using (true);

create policy "anon_insert_saves"
  on public.saves
  for insert
  to anon
  with check (true);

create policy "anon_update_saves"
  on public.saves
  for update
  to anon
  using (true)
  with check (true);
