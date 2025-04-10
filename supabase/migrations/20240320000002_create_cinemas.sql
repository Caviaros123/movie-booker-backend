CREATE TABLE IF NOT EXISTS public.cinemas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.cinemas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cinemas are viewable by everyone"
    ON public.cinemas FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can manage cinemas"
    ON public.cinemas FOR ALL
    USING (auth.role() = 'authenticated'); 