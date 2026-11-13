-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Civic issues table with geometry point
CREATE TABLE IF NOT EXISTS civic_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- Pothole, Garbage, Water Leak, Streetlight
    title VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    status VARCHAR(20) DEFAULT 'REPORTED', -- REPORTED, IN_PROGRESS, RESOLVED
    geom GEOMETRY(Point, 4326) NOT NULL,
    address TEXT,
    ward_id VARCHAR(50),
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index on geometry
CREATE INDEX IF NOT EXISTS idx_civic_reports_geom ON civic_reports USING GIST(geom);
