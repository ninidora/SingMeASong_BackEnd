PGDMP         3                 y            smas_dev    14.0    14.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    35526    smas_dev    DATABASE     ]   CREATE DATABASE smas_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE smas_dev;
             
   pedrolpin4    false            �            1259    35528    musics    TABLE     �   CREATE TABLE public.musics (
    id integer NOT NULL,
    name text NOT NULL,
    artist text NOT NULL,
    link text NOT NULL,
    score integer NOT NULL
);
    DROP TABLE public.musics;
       public         heap 
   pedrolpin4    false            �            1259    35527    musics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.musics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.musics_id_seq;
       public       
   pedrolpin4    false    210            �           0    0    musics_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.musics_id_seq OWNED BY public.musics.id;
          public       
   pedrolpin4    false    209            g           2604    35531 	   musics id    DEFAULT     f   ALTER TABLE ONLY public.musics ALTER COLUMN id SET DEFAULT nextval('public.musics_id_seq'::regclass);
 8   ALTER TABLE public.musics ALTER COLUMN id DROP DEFAULT;
       public       
   pedrolpin4    false    210    209    210            �          0    35528    musics 
   TABLE DATA           ?   COPY public.musics (id, name, artist, link, score) FROM stdin;
    public       
   pedrolpin4    false    210   i
       �           0    0    musics_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.musics_id_seq', 14, true);
          public       
   pedrolpin4    false    209            i           2606    35535    musics musics_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.musics
    ADD CONSTRAINT musics_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.musics DROP CONSTRAINT musics_pk;
       public         
   pedrolpin4    false    210            �   �   x��α�0���}�H���a����J�PRZ�����ʋY\\�����3�����u��u��1��S7K����56W�ߡ���]�2<V���s'�>Z W�� ��5V�D0���Je��:XQ�I��$[�6���X-�sV<W)�Z��۝�uw�u~`19y��7G6��     