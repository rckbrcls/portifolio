-- Database: electoralsystem

-- DROP DATABASE IF EXISTS electoralsystem;

CREATE DATABASE electoralsystem
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Criação da tabela partido
CREATE TABLE partido (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    programa TEXT NOT NULL
);

-- Criação da tabela cargo
CREATE TABLE cargo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    local VARCHAR(100) NOT NULL,
    quantidade_eleitos INT NOT NULL
);

-- Criação da tabela pessoa
CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL
);

-- Criação da tabela candidato
CREATE TABLE candidato (
    id SERIAL PRIMARY KEY,
    pessoa_id INT NOT NULL REFERENCES pessoa(id),
    partido_id INT NOT NULL REFERENCES partido(id),
    cargo_id INT NOT NULL REFERENCES cargo(id),
    data_candidatura DATE NOT NULL,
	eleito BOOLEAN,
    vice_candidato_id INT REFERENCES candidato(id)
);

-- Criação da tabela processo_judicial
CREATE TABLE processo_judicial (
    id SERIAL PRIMARY KEY,
    candidato_id INT NOT NULL REFERENCES candidato(id),
    status VARCHAR(50) NOT NULL,
    resultado VARCHAR(50),
    data_inicio DATE NOT NULL,
    data_termino DATE
);

-- Criação da tabela equipe_apoio
CREATE TABLE equipe_apoio (
    id SERIAL PRIMARY KEY,
    candidato_id INT NOT NULL REFERENCES candidato(id),
    ano INT NOT NULL
);

-- Criação da tabela participante_equipe
CREATE TABLE participante_equipe (
    id SERIAL PRIMARY KEY,
    pessoa_id INT NOT NULL REFERENCES pessoa(id),
    equipe_apoio_id INT NOT NULL REFERENCES equipe_apoio(id)
);

-- Criação da tabela doador
CREATE TABLE doador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

-- Criação da tabela doacao
CREATE TABLE doacao (
    id SERIAL PRIMARY KEY,
    doador_id INT NOT NULL REFERENCES doador(id),
    candidato_id INT NOT NULL REFERENCES candidato(id),
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL
);

-- Criação da tabela pleito
CREATE TABLE pleito (
    id SERIAL PRIMARY KEY,
    ano INT NOT NULL,
    cargo_id INT NOT NULL REFERENCES cargo(id),
    candidato_id INT NOT NULL REFERENCES candidato(id),
    votos_recebidos INT NOT NULL
);

-- Trigger para garantir que um candidato pode concorrer a apenas um cargo por ano
CREATE OR REPLACE FUNCTION check_unique_candidacy_per_year()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM candidato 
        WHERE pessoa_id = NEW.pessoa_id 
        AND EXTRACT(YEAR FROM data_candidatura) = EXTRACT(YEAR FROM NEW.data_candidatura)
        AND id != NEW.id
    ) THEN
        RAISE EXCEPTION 'O candidato já está concorrendo a um cargo neste ano';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_unique_candidacy_per_year
BEFORE INSERT OR UPDATE ON candidato
FOR EACH ROW
EXECUTE FUNCTION check_unique_candidacy_per_year();

-- Trigger para garantir que um indivíduo só pode participar de uma única equipe de apoio por ano
CREATE OR REPLACE FUNCTION check_unique_support_team_per_year()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM participante_equipe PE
        JOIN equipe_apoio EA ON PE.equipe_apoio_id = EA.id
        WHERE PE.pessoa_id = NEW.pessoa_id
        AND EA.ano = (SELECT ano FROM equipe_apoio WHERE id = NEW.equipe_apoio_id)
        AND PE.id != NEW.id
    ) THEN
        RAISE EXCEPTION 'O participante já está em uma equipe de apoio neste ano';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_unique_support_team_per_year
BEFORE INSERT OR UPDATE ON participante_equipe
FOR EACH ROW
EXECUTE FUNCTION check_unique_support_team_per_year();

DROP TABLE IF EXISTS participante_equipe CASCADE;
DROP TABLE IF EXISTS equipe_apoio CASCADE;
DROP TABLE IF EXISTS doacao CASCADE;
DROP TABLE IF EXISTS doador CASCADE;
DROP TABLE IF EXISTS pleito CASCADE;
DROP TABLE IF EXISTS processo_judicial CASCADE;
DROP TABLE IF EXISTS candidato CASCADE;
DROP TABLE IF EXISTS pessoa CASCADE;
DROP TABLE IF EXISTS cargo CASCADE;
DROP TABLE IF EXISTS partido CASCADE;

DROP FUNCTION IF EXISTS check_unique_candidacy_per_year() CASCADE;
DROP FUNCTION IF EXISTS check_unique_support_team_per_year() CASCADE;