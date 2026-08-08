-- ================================================
--  Intranet HPS — Schema Supabase
--  Execute no SQL Editor do projeto Supabase
-- ================================================

-- ---- Tabelas ----------------------------------------

create table public.sectors (
  id          uuid    default gen_random_uuid() primary key,
  slug        text    unique not null,
  name        text    not null,
  emoji       text    default '🏥',
  color       text    default 'blue',   -- blue | red | green | orange | purple | yellow
  description text,
  featured_app_url  text,               -- link do app destaque (ex: PS → app de leitos)
  featured_app_name text,
  sort_order  int     default 0,
  created_at  timestamptz default now()
);

create table public.posts (
  id          uuid    default gen_random_uuid() primary key,
  sector_id   uuid    references public.sectors(id) on delete cascade not null,
  title       text    not null,
  summary     text,
  body        text,                     -- aceita HTML simples
  tag         text    default 'aviso'
              check (tag in ('urgente','aviso','info','tutorial')),
  post_date   date    default current_date,
  author      text,
  published   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table public.links (
  id          uuid    default gen_random_uuid() primary key,
  sector_id   uuid    references public.sectors(id) on delete cascade not null,
  label       text    not null,
  url         text    not null default '#',
  icon        text    default '🔗',
  is_featured boolean default false,
  sort_order  int     default 0
);

create table public.extensions (
  id          uuid    default gen_random_uuid() primary key,
  sector_id   uuid    references public.sectors(id) on delete cascade not null,
  label       text    not null,
  number      text    not null,
  icon        text    default '📞',
  sort_order  int     default 0
);

create table public.documents (
  id          uuid    default gen_random_uuid() primary key,
  sector_id   uuid    references public.sectors(id) on delete cascade not null,
  label       text    not null,
  url         text    not null default '#',
  icon        text    default '📄',
  sort_order  int     default 0
);

create table public.faqs (
  id          uuid    default gen_random_uuid() primary key,
  sector_id   uuid    references public.sectors(id) on delete cascade not null,
  question    text    not null,
  answer      text    not null,
  sort_order  int     default 0
);

-- ---- Trigger: atualiza updated_at automaticamente ---

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---- Função: verifica se usuário é admin ---------------

create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ---- Row Level Security --------------------------------

alter table public.sectors    enable row level security;
alter table public.posts       enable row level security;
alter table public.links       enable row level security;
alter table public.extensions  enable row level security;
alter table public.documents   enable row level security;
alter table public.faqs        enable row level security;

-- Leitura pública (todos os usuários, sem login)
create policy "leitura publica sectors"    on public.sectors   for select using (true);
create policy "leitura publica posts"      on public.posts     for select using (published = true);
create policy "leitura publica links"      on public.links     for select using (true);
create policy "leitura publica extensions" on public.extensions for select using (true);
create policy "leitura publica documents"  on public.documents  for select using (true);
create policy "leitura publica faqs"       on public.faqs       for select using (true);

-- Escrita: somente admins (via Supabase Auth + app_metadata.role = 'admin')
create policy "admin sectors"    on public.sectors   for all using (public.is_admin()) with check (public.is_admin());
create policy "admin posts"      on public.posts     for all using (public.is_admin()) with check (public.is_admin());
create policy "admin links"      on public.links     for all using (public.is_admin()) with check (public.is_admin());
create policy "admin extensions" on public.extensions for all using (public.is_admin()) with check (public.is_admin());
create policy "admin documents"  on public.documents  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin faqs"       on public.faqs       for all using (public.is_admin()) with check (public.is_admin());

-- ---- Realtime: habilita publicação de mudanças ---------
-- Execute depois de criar as tabelas:
-- No Dashboard: Database → Replication → habilite todas as tabelas acima
