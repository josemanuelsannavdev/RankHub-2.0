--
-- PostgreSQL database dump
--

\restrict lBs2pNY9NDxtSfmVIIBd3sEJu4EYHcwzlSkYmVIASJX2r1NdeYBQ5cB48sZai19

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-24 21:50:20

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 41758)
-- Name: bets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bets (
    id uuid NOT NULL,
    event_id uuid NOT NULL,
    side_id uuid NOT NULL,
    player_id uuid NOT NULL,
    points integer NOT NULL,
    status character varying(255) NOT NULL,
    player_name character varying(255),
    player_image character varying(255),
    creator_name character varying(255)
);


ALTER TABLE public.bets OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41736)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid NOT NULL,
    game_name character varying(255) CONSTRAINT "events_gameName_not_null" NOT NULL,
    ranking_id uuid NOT NULL,
    status character varying(255) NOT NULL,
    date timestamp without time zone NOT NULL,
    creator_name character varying(255)
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41769)
-- Name: sideplayers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sideplayers (
    id uuid CONSTRAINT "sidePlayers_id_not_null" NOT NULL,
    name character varying(255) CONSTRAINT "sidePlayers_name_not_null" NOT NULL,
    image character varying(255) CONSTRAINT "sidePlayers_image_not_null" NOT NULL,
    side_id uuid CONSTRAINT "sidePlayers_side_id_not_null" NOT NULL
);


ALTER TABLE public.sideplayers OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41748)
-- Name: sides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sides (
    id uuid NOT NULL,
    event_id uuid NOT NULL,
    odds double precision NOT NULL,
    type character varying(255) NOT NULL,
    win boolean NOT NULL
);


ALTER TABLE public.sides OWNER TO postgres;


--
-- TOC entry 4872 (class 2606 OID 41768)
-- Name: bets bets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bets
    ADD CONSTRAINT bets_pkey PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 41747)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 41779)
-- Name: sideplayers sidePlayers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sideplayers
    ADD CONSTRAINT "sidePlayers_pkey" PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 41757)
-- Name: sides sides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sides
    ADD CONSTRAINT sides_pkey PRIMARY KEY (id);


-- Completed on 2026-06-24 21:50:20

--
-- PostgreSQL database dump complete
--

\unrestrict lBs2pNY9NDxtSfmVIIBd3sEJu4EYHcwzlSkYmVIASJX2r1NdeYBQ5cB48sZai19

