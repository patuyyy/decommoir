-- ===============================================
-- Database: deccomoir
-- ===============================================

-- CREATE DATABASE deccomoir;
-- \c deccomoir;

-- ===============================================
-- ENUM DEFINITIONS
-- ===============================================

CREATE TYPE roles AS ENUM ('admin', 'guest', 'school_admin');
CREATE TYPE device_size AS ENUM ('small', 'medium', 'large');

-- ===============================================
-- TABLE: users
-- ===============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role roles NOT NULL DEFAULT 'guest',
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: user_roles
-- ===============================================
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role roles NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: schools
-- ===============================================
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: maggot_devices
-- ===============================================
CREATE TABLE maggot_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_size device_size NOT NULL,
    deployed_at DATE,
    last_maintenance DATE,
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: harvest_logs
-- ===============================================
CREATE TABLE harvest_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES maggot_devices(id) ON DELETE CASCADE,
    harvest_at DATE NOT NULL,
    volume FLOAT CHECK (volume >= 0),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: maintenance_logs
-- ===============================================
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES maggot_devices(id) ON DELETE CASCADE,
    maintenance_at DATE NOT NULL,
    details TEXT,
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: food_waste_logs
-- ===============================================
CREATE TABLE food_waste_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES maggot_devices(id) ON DELETE CASCADE,
    image_url TEXT,
    taken_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);