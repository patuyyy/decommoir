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
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: user_roles
-- ===============================================
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role roles NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: schools
-- ===============================================
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: maggot_devices
-- ===============================================
CREATE TABLE maggot_devices (
    id SERIAL PRIMARY KEY,
    school_id INT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    device_size device_size NOT NULL,
    deployed_at DATE,
    last_maintenance DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: harvest_logs
-- ===============================================
CREATE TABLE harvest_logs (
    id SERIAL PRIMARY KEY,
    device_id INT NOT NULL REFERENCES maggot_devices(id) ON DELETE CASCADE,
    harvest_at DATE NOT NULL,
    volume FLOAT CHECK (volume >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: maintenance_logs
-- ===============================================
CREATE TABLE maintenance_logs (
    id SERIAL PRIMARY KEY,
    device_id INT NOT NULL REFERENCES maggot_devices(id) ON DELETE CASCADE,
    maintenance_at DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================
-- TABLE: food_waste_logs
-- ===============================================