-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Only authenticated users can manage movies" ON public.movies;
DROP POLICY IF EXISTS "Only authenticated users can manage cinemas" ON public.cinemas;
DROP POLICY IF EXISTS "Only authenticated users can manage screens" ON public.screens;
DROP POLICY IF EXISTS "Only authenticated users can manage screenings" ON public.screenings;
DROP POLICY IF EXISTS "Only authenticated users can manage all bookings" ON public.bookings;

-- Créer les nouvelles politiques avec vérification du rôle admin
CREATE POLICY "Only admins can manage movies"
    ON public.movies FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage cinemas"
    ON public.cinemas FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage screens"
    ON public.screens FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage screenings"
    ON public.screenings FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage all bookings"
    ON public.bookings FOR ALL
    USING (auth.role() = 'authenticated'); 