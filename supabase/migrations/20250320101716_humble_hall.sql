/*
  # Initial Schema Setup for Seekart

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to Supabase auth.users
      - `name` (text) - User's display name
      - `type` (text) - Either 'fan' or 'artist'
      - `profile_image` (text) - URL to profile image
      - `created_at` (timestamptz) - Account creation timestamp
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `image_url` (text) - Event image URL
      - `video_url` (text, nullable) - Optional video URL
      - `type` (text) - Event type (musica, teatro, etc.)
      - `latitude` (double precision) - Event location latitude
      - `longitude` (double precision) - Event location longitude
      - `address` (text) - Street address
      - `cross_streets` (text) - Cross streets reference
      - `locality` (text) - Neighborhood or area
      - `city` (text) - City name
      - `ticket_url` (text, nullable) - Optional ticket purchase URL
      - `date` (timestamptz) - Event date and time
      - `artist_id` (uuid) - Reference to users table
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for reading and writing data
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('fan', 'artist')),
  profile_image text,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  video_url text,
  type text NOT NULL CHECK (type IN ('musica', 'teatro', 'imagenes', 'letras', 'cine')),
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  address text NOT NULL,
  cross_streets text NOT NULL,
  locality text NOT NULL,
  city text NOT NULL,
  ticket_url text,
  date timestamptz NOT NULL,
  artist_id uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can read all profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for events table
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Artists can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND type = 'artist'
    )
  );

CREATE POLICY "Artists can update their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (artist_id = auth.uid());