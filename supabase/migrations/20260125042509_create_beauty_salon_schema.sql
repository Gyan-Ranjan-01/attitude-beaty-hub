/*
  # Beauty Salon Database Schema
  
  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text) - Service name
      - `category` (text) - Service category (Hair, Skin, Bridal, Nails, Spa)
      - `description` (text) - Service description
      - `price_start` (integer) - Starting price in rupees
      - `is_featured` (boolean) - Featured service flag
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `service_id` (uuid, foreign key to services)
      - `customer_name` (text)
      - `customer_phone` (text)
      - `customer_email` (text, optional)
      - `booking_date` (date)
      - `booking_time` (text)
      - `status` (text) - pending, confirmed, completed, cancelled
      - `created_at` (timestamp)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `rating` (integer) - 1 to 5
      - `review_text` (text)
      - `service_type` (text, optional)
      - `is_published` (boolean)
      - `created_at` (timestamp)
    
    - `gallery_images`
      - `id` (uuid, primary key)
      - `category` (text) - Bridal, Party, Hair, Interior
      - `image_url` (text)
      - `alt_text` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Allow public read access to services, testimonials, gallery
    - Allow public insert to bookings (for appointment requests)
    - Restrict admin operations to authenticated users
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  price_start integer NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  service_type text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Services policies (public read)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Bookings policies (public insert, authenticated manage)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials policies (public read published)
CREATE POLICY "Anyone can view published testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery policies (public read)
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample services
INSERT INTO services (name, category, description, price_start, is_featured) VALUES
  ('Bridal Makeup Package', 'Bridal', 'Complete bridal transformation with HD makeup, hairstyling, and draping', 15000, true),
  ('Party Makeup', 'Makeup', 'Glamorous party-ready makeup with long-lasting finish', 3000, true),
  ('Hair Spa Treatment', 'Hair', 'Deep conditioning hair spa with scalp massage and treatment', 1500, true),
  ('Classic Facial', 'Skin', 'Deep cleansing facial for glowing skin', 1200, false),
  ('Hair Cut & Styling', 'Hair', 'Professional haircut with styling', 800, false),
  ('Manicure & Pedicure', 'Nails', 'Complete nail care with polish', 1000, false),
  ('Pre-Bridal Package', 'Bridal', 'Complete skin and hair preparation for brides', 25000, true),
  ('Fruit Facial', 'Skin', 'Refreshing fruit facial for natural glow', 1500, false),
  ('Hair Coloring', 'Hair', 'Professional hair coloring service', 2500, false),
  ('Full Body Massage', 'Spa', 'Relaxing full body massage therapy', 2000, false),
  ('Gel Nail Extension', 'Nails', 'Long-lasting gel nail extensions', 2500, false),
  ('Anti-Aging Facial', 'Skin', 'Advanced anti-aging treatment', 2500, false);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, review_text, service_type) VALUES
  ('Priya Sharma', 5, 'Amazing bridal makeup! I felt like a princess on my wedding day. The team was so professional and caring.', 'Bridal Makeup'),
  ('Anita Roy', 5, 'Best salon in Bowbazar! The staff is friendly and the services are top-notch. Highly recommended!', 'Hair Spa'),
  ('Sneha Das', 5, 'Loved my party makeup! Got so many compliments. Will definitely come back again.', 'Party Makeup'),
  ('Ritu Banerjee', 5, 'Very hygienic and professional. Great experience with their facial services.', 'Facial'),
  ('Kavita Singh', 4, 'Good service and reasonable prices. The ambiance is very relaxing.', 'Spa'),
  ('Meera Chatterjee', 5, 'Perfect bridal package! They took care of everything. Stress-free experience.', 'Pre-Bridal');

-- Insert sample gallery images (using Pexels)
INSERT INTO gallery_images (category, image_url, alt_text, display_order) VALUES
  ('Bridal', 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=800', 'Bridal makeup look', 1),
  ('Bridal', 'https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg?auto=compress&cs=tinysrgb&w=800', 'Bridal hairstyle', 2),
  ('Party', 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800', 'Party makeup', 3),
  ('Hair', 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800', 'Hair styling', 4),
  ('Interior', 'https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=800', 'Salon interior', 5),
  ('Party', 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800', 'Glamorous party look', 6);