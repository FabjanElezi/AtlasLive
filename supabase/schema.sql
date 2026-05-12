-- ============================================================
-- AtlasLive — Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Enums
create type place_category as enum (
  'beach', 'restaurant', 'hotel', 'attraction', 'nightlife', 'service'
);
create type crowd_level as enum (
  'empty', 'quiet', 'moderate', 'busy', 'packed'
);
create type parking_status as enum (
  'available', 'limited', 'full'
);
create type sea_condition as enum (
  'calm', 'choppy', 'rough'
);

-- ============================================================
-- Tables
-- ============================================================

-- User profiles (extends auth.users)
create table profiles (
  id           uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url   text,
  created_at   timestamptz default now() not null
);

-- Places (destinations on the map)
create table places (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    place_category not null,
  lat         float8 not null,
  lng         float8 not null,
  description text,
  address     text,
  created_at  timestamptz default now() not null
);

-- Live reports (user-generated real-time conditions)
create table live_reports (
  id            uuid primary key default gen_random_uuid(),
  place_id      uuid not null references places on delete cascade,
  user_id       uuid not null references auth.users on delete cascade,
  crowd_level   crowd_level,
  vibe          text,
  parking       parking_status,
  sea_condition sea_condition,
  notes         text,
  photo_url     text,
  created_at    timestamptz default now() not null
);

-- ============================================================
-- Indexes
-- ============================================================

create index on places (category);
create index on live_reports (place_id);
create index on live_reports (created_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table profiles    enable row level security;
alter table places      enable row level security;
alter table live_reports enable row level security;

-- Profiles
create policy "Profiles viewable by everyone"
  on profiles for select using (true);
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Places
create policy "Places viewable by everyone"
  on places for select using (true);
create policy "Authenticated users can add places"
  on places for insert with check (auth.role() = 'authenticated');

-- Live reports
create policy "Live reports viewable by everyone"
  on live_reports for select using (true);
create policy "Authenticated users can submit reports"
  on live_reports for insert with check (auth.uid() = user_id);
create policy "Users can delete own reports"
  on live_reports for delete using (auth.uid() = user_id);

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Realtime (live reports update in real time)
-- ============================================================

alter publication supabase_realtime add table live_reports;

-- ============================================================
-- Seed: Places
-- ============================================================

insert into places (name, category, lat, lng, description, address) values
  ('Tirana',         'attraction', 41.3275, 19.8187, 'Capital city of Albania',                      'Tirana'),
  ('Shkodër',        'attraction', 42.0683, 19.5126, 'Historic city in northern Albania',            'Shkodër'),
  ('Sarandë',        'beach',      39.8752, 20.0069, 'Popular beach town on the Ionian Sea',         'Sarandë'),
  ('Butrint',        'attraction', 39.7453, 20.0196, 'Ancient ruins — UNESCO World Heritage Site',   'Butrint National Park'),
  ('Gjirokastër',    'attraction', 40.0758, 20.1389, 'UNESCO-listed "City of Stone"',                'Gjirokastër'),
  ('Velipojë Beach', 'beach',      41.8726, 19.4272, 'Long sandy beach in northern Albania',         'Velipojë, Shkodër'),
  ('Durrës Beach',   'beach',      41.3246, 19.4397, 'Closest beach to Tirana',                      'Durrës'),
  ('Berat',          'attraction', 40.7058, 19.9522, 'City of a Thousand Windows',                   'Berat'),
  ('Ksamil',         'beach',      39.7707, 20.0032, 'Crystal-clear water, island views',            'Ksamil, Sarandë'),
  ('Vlorë',          'beach',      40.4667, 19.4833, 'Gateway to the Albanian Riviera',              'Vlorë');
