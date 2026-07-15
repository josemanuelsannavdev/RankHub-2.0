--
-- PostgreSQL database dump
--

\restrict j1YQnR2VKPK0A5PgNcx7q7wYCXNwemAYJMs9JqqH5bKop9fysFb8mCyYrW3Q9pE

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-24 21:51:34

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
-- TOC entry 852 (class 1247 OID 25353)
-- Name: invitation_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.invitation_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'CANCELLED',
    'EXPIRED'
);


ALTER TYPE public.invitation_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 25361)
-- Name: invitations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invitations (
    id uuid NOT NULL,
    ranking_id uuid NOT NULL,
    invited_by_user_id uuid NOT NULL,
    token character varying(512) NOT NULL,
    status public.invitation_status NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    accepted_at timestamp without time zone,
    cancelled_at timestamp without time zone,
    email character varying NOT NULL
);


ALTER TABLE public.invitations OWNER TO postgres;

--
-- TOC entry 5007 (class 0 OID 25361)
-- Dependencies: 219
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 4859 (class 2606 OID 25373)
-- Name: invitations invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (id, token);


-- Completed on 2026-06-24 21:51:34

--
-- PostgreSQL database dump complete
--

\unrestrict j1YQnR2VKPK0A5PgNcx7q7wYCXNwemAYJMs9JqqH5bKop9fysFb8mCyYrW3Q9pE

