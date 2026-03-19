-- Выполни этот SQL в Supabase → SQL Editor

create table reports (
  id uuid primary key,
  url text not null,
  created_at timestamptz default now(),
  data jsonb not null
);

-- Индекс для быстрого поиска по дате
create index idx_reports_created_at on reports (created_at desc);

-- RLS: разрешить всем читать и создавать (для MVP)
alter table reports enable row level security;

create policy "Anyone can insert reports" on reports
  for insert with check (true);

create policy "Anyone can read reports" on reports
  for select using (true);
