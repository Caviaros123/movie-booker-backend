CREATE TABLE IF NOT EXISTS public.screens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cinema_id UUID REFERENCES public.cinemas ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.screens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Screens are viewable by everyone"
    ON public.screens FOR SELECT
    USING (true);

CREATE POLICY "Only admins can manage screens"
    ON public.screens FOR ALL
    USING (auth.role() = 'authenticated' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')); 