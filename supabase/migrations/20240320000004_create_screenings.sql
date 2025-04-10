CREATE TABLE IF NOT EXISTS public.screenings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    movie_id UUID REFERENCES public.movies ON DELETE CASCADE NOT NULL,
    screen_id UUID REFERENCES public.screens ON DELETE CASCADE NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.screenings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Screenings are viewable by everyone"
    ON public.screenings FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can manage screenings"
    ON public.screenings FOR ALL
    USING (auth.role() = 'authenticated'); 