CREATE TABLE IF NOT EXISTS public.movies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    release_date DATE NOT NULL,
    rating DECIMAL(2,1),
    poster_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Movies are viewable by everyone"
    ON public.movies FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can manage movies"
    ON public.movies FOR ALL
    USING (auth.role() = 'authenticated'); 