--
-- PostgreSQL database dump
--

\restrict aZGKbziMOEJIzW8uN31rwsJG5zOwhjkbP2Fex6tRDk2OWiNaqbjmc5DfhcvfHqr

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-24 21:51:57

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
-- TOC entry 873 (class 1247 OID 17038)
-- Name: games_types; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.games_types AS ENUM (
    'INDIVIDUAL_GAME',
    'TEAM_GAME',
    'DUEL_GAME'
);


ALTER TYPE public.games_types OWNER TO postgres;

--
-- TOC entry 864 (class 1247 OID 16830)
-- Name: roles_types; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.roles_types AS ENUM (
    'ADMIN',
    'SUB_ADMIN',
    'GUEST'
);


ALTER TYPE public.roles_types OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 17089)
-- Name: duels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.duels (
    id uuid NOT NULL,
    winner_id uuid,
    loser_id uuid,
    bet integer NOT NULL,
    game_id uuid NOT NULL,
    winner_guest_name character varying,
    loser_guest_name character varying
);


ALTER TABLE public.duels OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17045)
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    date timestamp without time zone NOT NULL,
    ranking_id uuid NOT NULL,
    type public.games_types NOT NULL
);


ALTER TABLE public.games OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17055)
-- Name: gamesnames; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gamesnames (
    id uuid CONSTRAINT "gamesNames_id_not_null" NOT NULL,
    ranking_id uuid CONSTRAINT "gamesNames_ranking_id_not_null" NOT NULL,
    name character varying(255) CONSTRAINT "gamesNames_name_not_null" NOT NULL
);


ALTER TABLE public.gamesnames OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17119)
-- Name: historicos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historicos (
    id uuid NOT NULL,
    game_id uuid NOT NULL,
    player_id uuid CONSTRAINT "historicos_player_Id_not_null" NOT NULL,
    total_points double precision CONSTRAINT "historicos_totalPoints_not_null" NOT NULL,
    obtained_points double precision,
    "position" integer
);


ALTER TABLE public.historicos OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17080)
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participants (
    id uuid NOT NULL,
    "position" integer NOT NULL,
    points integer NOT NULL,
    game_id uuid NOT NULL,
    guest_name character varying(255),
    player_id uuid
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16896)
-- Name: players; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.players (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    points double precision NOT NULL,
    games_played integer CONSTRAINT "players_games_Played_not_null" NOT NULL,
    games_won integer CONSTRAINT "players_games_Won_not_null" NOT NULL,
    games_lost integer CONSTRAINT "players_games_Lost_not_null" NOT NULL,
    ranking_id uuid NOT NULL,
    image character varying(255) NOT NULL
);


ALTER TABLE public.players OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16772)
-- Name: rankings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rankings (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(255),
    description character varying(50)
);


ALTER TABLE public.rankings OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16857)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    ranking_id uuid NOT NULL,
    role public.roles_types NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17063)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    points integer NOT NULL,
    "position" integer NOT NULL,
    game_id uuid NOT NULL
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17073)
-- Name: teamsmembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teamsmembers (
    id uuid CONSTRAINT teams_members_id_not_null NOT NULL,
    player_id uuid,
    team_id uuid CONSTRAINT teams_members_team_id_not_null NOT NULL,
    guest_name character varying(255)
);


ALTER TABLE public.teamsmembers OWNER TO postgres;

--
-- TOC entry 4914 (class 2606 OID 17098)
-- Name: duels duels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.duels
    ADD CONSTRAINT duels_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 17062)
-- Name: gamesnames gamesNames_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gamesnames
    ADD CONSTRAINT "gamesNames_pkey" PRIMARY KEY (id);


--
-- TOC entry 4904 (class 2606 OID 17054)
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- TOC entry 4916 (class 2606 OID 17128)
-- Name: historicos historicos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historicos
    ADD CONSTRAINT historicos_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 17088)
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 16910)
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- TOC entry 4898 (class 2606 OID 16778)
-- Name: rankings rankings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rankings
    ADD CONSTRAINT rankings_pkey PRIMARY KEY (id);


--
-- TOC entry 4900 (class 2606 OID 16865)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4910 (class 2606 OID 17079)
-- Name: teamsmembers teams_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teamsmembers
    ADD CONSTRAINT teams_members_pkey PRIMARY KEY (id);


--
-- TOC entry 4908 (class 2606 OID 17072)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- TOC entry 4917 (class 2606 OID 16921)
-- Name: players players_ranking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_ranking_id_fkey FOREIGN KEY (ranking_id) REFERENCES public.rankings(id) ON DELETE CASCADE;


-- Completed on 2026-06-24 21:51:58

--
-- PostgreSQL database dump complete
--

\unrestrict aZGKbziMOEJIzW8uN31rwsJG5zOwhjkbP2Fex6tRDk2OWiNaqbjmc5DfhcvfHqr

