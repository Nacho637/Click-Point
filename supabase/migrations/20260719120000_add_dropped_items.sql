-- Abgelegte Gegenstände liegen am Boden und können wieder aufgehoben werden.
-- Sie werden pro Spielstand als Liste { item, position } persistiert.
alter table public.saves
  add column if not exists dropped_items jsonb not null default '[]'::jsonb;
