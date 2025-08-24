-- TEARDOWN.sql
-- Remove all schema objects for the electoral system database.

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
