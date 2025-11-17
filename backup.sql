--
-- PostgreSQL database dump
--

\restrict uhEKvheIbFsvJwtpkfoulZkI9XJFaV5Hh922EgKqp7imXinLV3CE1a2qMlDsgJ3

-- Dumped from database version 17.5 (aa1f746)
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-15 17:21:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 854 (class 1247 OID 16498)
-- Name: device_size; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.device_size AS ENUM (
    'small',
    'medium',
    'large'
);


ALTER TYPE public.device_size OWNER TO neondb_owner;

--
-- TOC entry 851 (class 1247 OID 16491)
-- Name: roles; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.roles AS ENUM (
    'admin',
    'guest',
    'school_admin'
);


ALTER TYPE public.roles OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16585)
-- Name: food_waste_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.food_waste_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    device_id uuid NOT NULL,
    image_url text,
    taken_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.food_waste_logs OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 16556)
-- Name: harvest_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.harvest_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    device_id uuid NOT NULL,
    harvest_at date NOT NULL,
    volume double precision,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT harvest_logs_volume_check CHECK ((volume >= (0)::double precision))
);


ALTER TABLE public.harvest_logs OWNER TO neondb_owner;

--
-- TOC entry 219 (class 1259 OID 16543)
-- Name: maggot_devices; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.maggot_devices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    device_size public.device_size NOT NULL,
    deployed_at date,
    last_maintenance date,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.maggot_devices OWNER TO neondb_owner;

--
-- TOC entry 221 (class 1259 OID 16570)
-- Name: maintenance_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.maintenance_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    device_id uuid NOT NULL,
    maintenance_at date NOT NULL,
    details text,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    performed_by uuid
);


ALTER TABLE public.maintenance_logs OWNER TO neondb_owner;

--
-- TOC entry 218 (class 1259 OID 16533)
-- Name: schools; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.schools (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    address text,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.schools OWNER TO neondb_owner;

--
-- TOC entry 217 (class 1259 OID 16505)
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role public.roles DEFAULT 'guest'::public.roles NOT NULL,
    updated_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    school_id uuid,
    photo_url text
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- TOC entry 3404 (class 0 OID 16585)
-- Dependencies: 222
-- Data for Name: food_waste_logs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.food_waste_logs (id, device_id, image_url, taken_at, updated_at, created_at) FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 16556)
-- Dependencies: 220
-- Data for Name: harvest_logs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.harvest_logs (id, device_id, harvest_at, volume, updated_at, created_at) FROM stdin;
\.


--
-- TOC entry 3401 (class 0 OID 16543)
-- Dependencies: 219
-- Data for Name: maggot_devices; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.maggot_devices (id, school_id, device_size, deployed_at, last_maintenance, updated_at, created_at) FROM stdin;
8f220eba-bc27-41f1-ba15-2fe154bc8534	381fc38a-2f38-4506-ba7d-6d50a4469e8f	large	2025-11-01	2025-11-01	2025-11-15 07:44:43.968953	2025-11-15 05:18:23.120491
\.


--
-- TOC entry 3403 (class 0 OID 16570)
-- Dependencies: 221
-- Data for Name: maintenance_logs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.maintenance_logs (id, device_id, maintenance_at, details, updated_at, created_at, performed_by) FROM stdin;
\.


--
-- TOC entry 3400 (class 0 OID 16533)
-- Dependencies: 218
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.schools (id, name, address, updated_at, created_at) FROM stdin;
381fc38a-2f38-4506-ba7d-6d50a4469e8f	SMAN 68 JAKARTA	Jalan Salemba Raya No. 18, Kelurahan Kenari, Kecamatan Senen, Jakarta Pusat	2025-11-14 17:43:16.870683	2025-11-14 17:43:16.870683
42c41e99-edab-4334-905c-8944b7a9d01b	SMAN 8 JAKARTA	Jalan Taman Bukitduri No. 2, Kelurahan Bukit Duri, Kecamatan Tebet, Jakarta Selatan	2025-11-14 17:43:49.342622	2025-11-14 17:43:49.342622
baffe7ef-e0f0-4f4a-9b3b-ad5c42e70f5a	SMAN 5 BEKASI	Jl. Gamprit Jati Waringin Asri, Kelurahan Jatiwaringin, Kecamatan Pondok Gede, Kota Bekasi, Jawa Barat	2025-11-14 17:50:45.204446	2025-11-14 17:50:45.204446
5a8e956f-02bb-4e64-8380-1680de2a6241	SMAN 6 JAKARTA	Jl. Mahakam I Blok C No. 2, RT. 11 / RW. 07, Kelurahan Kramat Pela, Kecamatan Kebayoran Baru, Jakarta Selatan	2025-11-14 17:51:36.317057	2025-11-14 17:51:36.317057
\.


--
-- TOC entry 3399 (class 0 OID 16505)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, email, name, username, password, role, updated_at, created_at, school_id, photo_url) FROM stdin;
b3d72f92-fd4c-4631-b0ae-a08557a4842f	ryan@test.com	Ryan Safa Tjendana	ryansaf	$2b$10$9kNuxtlXjOJyKOGzZ9Or.eSooaVAwuQvUatgM.xe1kIKKNobM.Jy6	guest	2025-11-14 16:41:44.216888	2025-11-14 16:41:44.216888	\N	\N
05f55337-4686-405b-a42a-3036684c61dc	ihsan@gmail.com	ihsan patuy	ihsan	$2b$10$hcufpR6yiENCnSmznfviE.L2oFF3zndC.M9fP1WC7aopmG6/e7rN2	admin	2025-11-14 20:32:03.926233	2025-11-14 16:52:03.900358	\N	https://res.cloudinary.com/darhro5gs/image/upload/v1763152323/decommoir/user_photos/user_05f55337-4686-405b-a42a-3036684c61dc_photo.webp
\.


--
-- TOC entry 3247 (class 2606 OID 16594)
-- Name: food_waste_logs food_waste_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.food_waste_logs
    ADD CONSTRAINT food_waste_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16564)
-- Name: harvest_logs harvest_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.harvest_logs
    ADD CONSTRAINT harvest_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16550)
-- Name: maggot_devices maggot_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.maggot_devices
    ADD CONSTRAINT maggot_devices_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 16579)
-- Name: maintenance_logs maintenance_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT maintenance_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16542)
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16517)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3235 (class 2606 OID 16515)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16519)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3253 (class 2606 OID 16595)
-- Name: food_waste_logs food_waste_logs_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.food_waste_logs
    ADD CONSTRAINT food_waste_logs_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.maggot_devices(id) ON DELETE CASCADE;


--
-- TOC entry 3250 (class 2606 OID 16565)
-- Name: harvest_logs harvest_logs_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.harvest_logs
    ADD CONSTRAINT harvest_logs_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.maggot_devices(id) ON DELETE CASCADE;


--
-- TOC entry 3249 (class 2606 OID 16551)
-- Name: maggot_devices maggot_devices_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.maggot_devices
    ADD CONSTRAINT maggot_devices_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- TOC entry 3251 (class 2606 OID 16580)
-- Name: maintenance_logs maintenance_logs_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT maintenance_logs_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.maggot_devices(id) ON DELETE CASCADE;


--
-- TOC entry 3252 (class 2606 OID 32768)
-- Name: maintenance_logs maintenance_logs_performed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.maintenance_logs
    ADD CONSTRAINT maintenance_logs_performed_by_fkey FOREIGN KEY (performed_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3248 (class 2606 OID 24576)
-- Name: users users_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE SET NULL;


--
-- TOC entry 2070 (class 826 OID 16488)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2069 (class 826 OID 16487)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-11-15 17:21:36

--
-- PostgreSQL database dump complete
--

\unrestrict uhEKvheIbFsvJwtpkfoulZkI9XJFaV5Hh922EgKqp7imXinLV3CE1a2qMlDsgJ3

