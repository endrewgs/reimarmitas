-- Criar tabela para armazenar dados dos clientes que fizeram pedidos
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (qualquer pessoa pode enviar seus dados)
CREATE POLICY "Anyone can insert customer data"
ON public.customers
FOR INSERT
WITH CHECK (true);

-- Política para permitir SELECT apenas por usuários autenticados (você como admin)
CREATE POLICY "Authenticated users can view all customers"
ON public.customers
FOR SELECT
TO authenticated
USING (true);

-- Adicionar índice para ordenação por data
CREATE INDEX idx_customers_created_at ON public.customers(created_at DESC);