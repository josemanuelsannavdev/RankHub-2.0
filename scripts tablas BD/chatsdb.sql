--
-- PostgreSQL database dump
--

\restrict svFWGKevLhw02njz6bDDQue6tOG9zalHQanGOfbeVcFRXSyrTxJ8HyPLaTtW85z

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-24 21:51:13

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
-- TOC entry 219 (class 1259 OID 33544)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id uuid NOT NULL,
    ranking_id uuid NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33551)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid NOT NULL,
    chat_id uuid NOT NULL,
    username character varying(255) NOT NULL,
    date timestamp without time zone NOT NULL,
    body character varying(255) NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
--
-- TOC entry 4860 (class 2606 OID 33550)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- TOC entry 4862 (class 2606 OID 33562)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


-- Completed on 2026-06-24 21:51:13

--
-- PostgreSQL database dump complete
--

\unrestrict svFWGKevLhw02njz6bDDQue6tOG9zalHQanGOfbeVcFRXSyrTxJ8HyPLaTtW85z

