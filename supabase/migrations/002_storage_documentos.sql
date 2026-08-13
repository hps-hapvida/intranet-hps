-- ============================================================
-- Migration 002 — Bucket de documentos + coluna storage_path
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================================

-- 1. Coluna storage_path na tabela documents
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS storage_path text;

-- 2. Criar bucket público para PDFs (máx 20 MB por arquivo)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documentos',
  'documentos',
  true,
  20971520,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Policies de Storage
-- Leitura pública (qualquer um pode baixar)
CREATE POLICY "documentos_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documentos');

-- Upload apenas para admin
CREATE POLICY "documentos_admin_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documentos'
    AND public.is_admin()
  );

-- Update apenas para admin
CREATE POLICY "documentos_admin_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'documentos'
    AND public.is_admin()
  );

-- Delete apenas para admin
CREATE POLICY "documentos_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documentos'
    AND public.is_admin()
  );
