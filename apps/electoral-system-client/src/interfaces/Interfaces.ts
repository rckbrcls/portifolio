interface Doacao {
  candidato_id: number;
  data: string;
  doador_id: number;
  id: number;
  valor: string;
  candidato?: Pessoa;
}

interface EquipeDeApoio {
  ano: number;
  candidato_id: number;
  id: number;
  candidato?: Pessoa;
}

interface Partido {
  id: number;
  nome: string;
  programa: string;
}

interface Pessoa {
  data_nascimento: string;
  id: number;
  nome: string;
}

interface ProcessoJudicial {
  candidato_id: number;
  data_inicio: string;
  data_termino: string | null;
  id: number;
  resultado: string;
  status: string;
  candidato?: Pessoa;
}

interface ViceCandidato {
  data_nascimento: string;
  id: number;
  nome: string;
}

interface Cargo {
  id: number;
  local: string;
  nome: string;
  quantidade_eleitos: number;
  tipo: string;
}

interface Candidatura {
  data_candidatura: string;
  doacoes: Doacao[];
  cargo: Cargo;
  equipe_de_apoio: EquipeDeApoio;
  eleito: boolean;
  id: number;
  partido: Partido;
  pessoa: Pessoa;
  processos_judiciais: ProcessoJudicial[];
  vice_candidato: ViceCandidato;
  participantes_equipe: Pessoa[];
}
