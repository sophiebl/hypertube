--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: comments; Type: TABLE; Schema: public; Owner: sophie
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    movie integer NOT NULL,
    author integer NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO sophie;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: sophie
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO sophie;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sophie
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: downloaded_movies; Type: TABLE; Schema: public; Owner: sophie
--

CREATE TABLE public.downloaded_movies (
    id integer NOT NULL,
    last_watched timestamp with time zone NOT NULL,
    path text
);


ALTER TABLE public.downloaded_movies OWNER TO sophie;

--
-- Name: downloaded_movies_id_seq; Type: SEQUENCE; Schema: public; Owner: sophie
--

CREATE SEQUENCE public.downloaded_movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.downloaded_movies_id_seq OWNER TO sophie;

--
-- Name: downloaded_movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sophie
--

ALTER SEQUENCE public.downloaded_movies_id_seq OWNED BY public.downloaded_movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: sophie
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    picture text,
    password text NOT NULL,
    language text DEFAULT 'EN'::text,
    validated boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO sophie;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: sophie
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO sophie;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sophie
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: watched_movies; Type: TABLE; Schema: public; Owner: sophie
--

CREATE TABLE public.watched_movies (
    id integer NOT NULL,
    "user" integer NOT NULL,
    movie integer NOT NULL,
    already_watched smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.watched_movies OWNER TO sophie;

--
-- Name: watched_movies_id_seq; Type: SEQUENCE; Schema: public; Owner: sophie
--

CREATE SEQUENCE public.watched_movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.watched_movies_id_seq OWNER TO sophie;

--
-- Name: watched_movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sophie
--

ALTER SEQUENCE public.watched_movies_id_seq OWNED BY public.watched_movies.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: downloaded_movies id; Type: DEFAULT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.downloaded_movies ALTER COLUMN id SET DEFAULT nextval('public.downloaded_movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: watched_movies id; Type: DEFAULT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.watched_movies ALTER COLUMN id SET DEFAULT nextval('public.watched_movies_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: sophie
--

COPY public.comments (id, movie, author, content, created_at) FROM stdin;
\.


--
-- Data for Name: downloaded_movies; Type: TABLE DATA; Schema: public; Owner: sophie
--

COPY public.downloaded_movies (id, last_watched, path) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: sophie
--

COPY public.users (id, username, firstname, lastname, email, picture, password, language, validated) FROM stdin;
1	sboulaao	sophie	boulaaouli\n	sophieboulaaouli@gmail.com	\N	test123	EN	f
\.


--
-- Data for Name: watched_movies; Type: TABLE DATA; Schema: public; Owner: sophie
--

COPY public.watched_movies (id, "user", movie, already_watched) FROM stdin;
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sophie
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: downloaded_movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sophie
--

SELECT pg_catalog.setval('public.downloaded_movies_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sophie
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: watched_movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sophie
--

SELECT pg_catalog.setval('public.watched_movies_id_seq', 1, false);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: watched_movies watched_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watched_movies_pkey PRIMARY KEY (id);


--
-- Name: comments comments_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_fkey FOREIGN KEY (author) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;


--
-- Name: watched_movies watchedmovies_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sophie
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watchedmovies_users_fkey FOREIGN KEY ("user") REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

