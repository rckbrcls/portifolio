import {
  Show,
  createEffect,
  createResource,
  createSignal,
  onMount,
  type Component,
} from "solid-js";
import { Header } from "./components/Header";

async function fetchCandidatos(): Promise<Candidatura[]> {
  const response = await fetch("http://127.0.0.1:5000/candidato");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

async function fetchPartidos(): Promise<Partido[]> {
  const response = await fetch("http://127.0.0.1:5000/partido");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}

async function fetchCargos(): Promise<Cargo[]> {
  const response = await fetch("http://127.0.0.1:5000/cargo");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}
async function fetchProcessosJudiciaias(): Promise<ProcessoJudicial[]> {
  const response = await fetch("http://127.0.0.1:5000/processo_judicial");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}
async function fetchPessoas(): Promise<Pessoa[]> {
  const response = await fetch("http://127.0.0.1:5000/pessoa");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}
async function fetchEquipesDeApoio(): Promise<EquipeDeApoio[]> {
  const response = await fetch("http://127.0.0.1:5000/equipe_apoio");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}
async function fetchDoacoes(): Promise<Doacao[]> {
  const response = await fetch("http://127.0.0.1:5000/doacao");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const data = await response.json();
  return data;
}

interface FiltroCandidato {
  ficha?: string; // Resultado do processo judicial
  cargo?: string; // Cargo do candidato
  partido?: string; // Partido do candidato
  data?: string; // Ano de candidatura
  temVice?: string;
  eleito?: string;
}

const App: Component = () => {
  const [candidatos, setCandidatos] = createSignal<Candidatura[]>([]);
  const [candidatosFiltrados, setcandidatosFiltrados] = createSignal<
    Candidatura[]
  >([]);
  const [partidos, setPartidos] = createSignal<Partido[]>([]);
  const [cargos, setCargos] = createSignal<Cargo[]>([]);
  const [processosJudiciais, setProcessosJudiciais] = createSignal<
    ProcessoJudicial[]
  >([]);
  const [equipesApoio, setEquipesApoio] = createSignal<EquipeDeApoio[]>([]);
  const [pessoas, setPessoas] = createSignal<Pessoa[]>([]);
  const [doacoes, setDoacoes] = createSignal<Doacao[]>([]);
  const [datas, setDatas] = createSignal<number[]>([]);
  const [tab, setTab] = createSignal<number>(0);
  const [filtro, setFiltro] = createSignal<FiltroCandidato | null>(null);
  const [searchTerm, setSearchTerm] = createSignal("");

  function atualizaListas() {
    fetchCandidatosAndSetDates();
    fetchPartidos().then(setPartidos);
    fetchCargos().then(setCargos);
    fetchProcessosJudiciaias().then(setProcessosJudiciais);
    fetchEquipesDeApoio().then(setEquipesApoio);
    fetchPessoas().then(setPessoas);
    fetchDoacoes().then(setDoacoes);
  }

  onMount(() => {
    atualizaListas();
  });

  function fetchCandidatosAndSetDates() {
    fetchCandidatos().then((data) => {
      setCandidatos(data);
      const dataMap = new Set(
        data.map((item) => new Date(item.data_candidatura).getFullYear()),
      );
      setDatas(Array.from(dataMap));
    });
  }

  createEffect(
    () => setcandidatosFiltrados(filtrarCandidatos(candidatos(), filtro())),
    [filtro],
  );

  createEffect(
    () => setcandidatosFiltrados(filtrarPorBusca(candidatos(), searchTerm())),
    [searchTerm],
  );

  const filtrarPorBusca = (candidatos: Candidatura[], filtro: string) => {
    return candidatos.filter((item) =>
      item.pessoa.nome.toLowerCase().includes(filtro.toLowerCase()),
    );
  };

  async function deleteCandidato(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/candidato/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setCandidatos((prevCandidatos) =>
        prevCandidatos.filter((candidato) => candidato.id !== id),
      );
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deleteCargo(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cargo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setCargos((prevCargos) => prevCargos.filter((cargo) => cargo.id !== id));
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deletePartido(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/partido/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setPartidos((prevPartidos) =>
        prevPartidos.filter((partido) => partido.id !== id),
      );
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deleteDoacao(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/doacao/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setDoacoes((prevDoacaos) =>
        prevDoacaos.filter((doacao) => doacao.id !== id),
      );
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deletePessoa(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/pessoa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setPessoas((prevPessoas) =>
        prevPessoas.filter((pessoa) => pessoa.id !== id),
      );
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deleteProcessoJudicial(id: number): Promise<void> {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/processo_judicial/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setProcessosJudiciais((prevProcessoJudicials) =>
        prevProcessoJudicials.filter(
          (processoJudicial) => processoJudicial.id !== id,
        ),
      );
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function deleteEquipeApoio(id: number): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/equipe_apoio/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setEquipesApoio((prevEquipeApoios) =>
        prevEquipeApoios.filter((equipeApoio) => equipeApoio.id !== id),
      );
      fetchCandidatosAndSetDates();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }

  function filtrarCandidatos(
    candidatos: Candidatura[],
    filtro: FiltroCandidato | null,
  ) {
    return candidatos.filter((candidato) => {
      // Verificar se a candidatura é procedente ou não procedente
      const processoFiltrado =
        !filtro ||
        !filtro.ficha ||
        (candidato.processos_judiciais &&
          candidato.processos_judiciais.some(
            (processo) => processo.resultado === filtro.ficha,
          ));

      // Filtrar por cargo
      const cargoFiltrado =
        !filtro || !filtro.cargo || candidato.cargo.nome === filtro.cargo;

      // Filtrar por partido
      const partidoFiltrado =
        !filtro || !filtro.partido || candidato.partido.nome === filtro.partido;

      // Filtrar por ano de candidatura
      const anoFiltrado =
        !filtro ||
        !filtro.data ||
        new Date(candidato.data_candidatura).getFullYear() ===
          parseInt(filtro.data);

      const viceFiltrado =
        !filtro ||
        !filtro.temVice ||
        (filtro.temVice === "sim" && candidato.vice_candidato) ||
        (filtro.temVice === "nao" && !candidato.vice_candidato);

      const eleitoFiltrado =
        !filtro ||
        !filtro.eleito ||
        (filtro.eleito === "sim" && candidato.eleito) ||
        (filtro.eleito === "nao" && !candidato.eleito);

      // Retornar true se todos os critérios forem atendidos
      return (
        processoFiltrado &&
        cargoFiltrado &&
        partidoFiltrado &&
        anoFiltrado &&
        viceFiltrado &&
        eleitoFiltrado
      );
    });
  }

  return (
    <>
      <Header atualizaListas={atualizaListas} />
      <div class="my-10 flex w-full flex-col items-center gap-4">
        <div class="flex w-11/12 items-center justify-between gap-4">
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 0 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(0)}
          >
            Candidatos
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 1 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(1)}
          >
            Cargos
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 2 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(2)}
          >
            Partidos
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 3 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(3)}
          >
            Doações
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 4 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(4)}
          >
            Processos Judiciais
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 5 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(5)}
          >
            Equipes de apoio
          </button>
          <button
            class={`w-full text-nowrap rounded-lg  ${tab() == 6 ? "bg-base-300" : "btn-outline"} p-4`}
            onClick={() => setTab(6)}
          >
            Pessoas
          </button>
        </div>
        {tab() == 0 && (
          <Show when={candidatos()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="flex w-11/12 flex-wrap items-center justify-between gap-y-4">
                    <input
                      type="text"
                      placeholder="Procure pelo nome do candidato"
                      class="input input-bordered w-full"
                      value={searchTerm()}
                      onInput={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), ficha: e.target.value })
                      }
                      value={filtro()?.ficha ?? ""}
                    >
                      <option value="">Ficha</option>
                      <option value="Procedente">Procedente</option>
                      <option value="Não Procedente">Não Procedente</option>
                    </select>
                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), eleito: e.target.value })
                      }
                      value={filtro()?.eleito ?? ""}
                    >
                      <option value="">Foi Eleito?</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), cargo: e.target.value })
                      }
                      value={filtro()?.cargo ?? ""}
                    >
                      <option value="">Cargo</option>
                      {cargos().map((item) => (
                        <option value={item.nome}>{item.nome}</option>
                      ))}
                    </select>
                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), partido: e.target.value })
                      }
                      value={filtro()?.partido ?? ""}
                    >
                      <option value="">Partido</option>
                      {partidos().map((item) => (
                        <option value={item.nome}>{item.nome}</option>
                      ))}
                    </select>
                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), data: e.target.value })
                      }
                      value={filtro()?.data ?? ""}
                    >
                      <option value="">Ano de candidatura</option>
                      {datas().map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      class="select select-bordered w-[33%]"
                      onChange={(e) =>
                        setFiltro({ ...filtro(), temVice: e.target.value })
                      }
                      value={filtro()?.temVice ?? ""}
                    >
                      <option value="">Tem Vice</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                    <button
                      class="btn btn-neutral w-full"
                      onClick={() => setFiltro(null)}
                    >
                      Limpar filtro
                    </button>
                  </div>
                  {candidatosFiltrados()?.length &&
                    candidatosFiltrados().map((item) => (
                      <div class="w-11/12 rounded-xl bg-base-200 p-7">
                        <div class="flex items-center justify-between">
                          <p class="text-2xl hover:cursor-pointer hover:underline">
                            {item.pessoa.nome}
                          </p>
                          <p class="text-lg">{item.cargo.nome}</p>
                          <p class="text-lg">{item.partido.nome}</p>
                          <p class="text-lg">
                            {item.eleito ? "Eleito" : "Não eleito"}
                          </p>
                          <p class="text-lg">
                            {new Date(item.data_candidatura).getFullYear()}
                          </p>
                          <button
                            class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                            onClick={async () => await deleteCandidato(item.id)}
                          >
                            deletar
                          </button>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between gap-4">
                          {item.participantes_equipe?.length && (
                            <div class="w-full flex-col gap-4 rounded-xl bg-base-300 px-4 py-6">
                              <p class="text-lg">Equipe de apoio</p>
                              <div class="divider"></div>
                              {item.participantes_equipe.map((pessoa) => (
                                <div class="hover:cursor-pointer hover:underline">
                                  {pessoa.nome}
                                </div>
                              ))}
                            </div>
                          )}

                          {item.processos_judiciais?.length && (
                            <div class="w-full gap-4 rounded-xl bg-base-300 p-6">
                              <p class="text-lg">Processos Judiciais</p>
                              <div class="divider"></div>
                              {item.processos_judiciais.map((processo) => (
                                <div class="hover:cursor-pointer hover:underline">
                                  {processo.data_inicio} - {processo.status} -{" "}
                                  {processo.resultado}
                                </div>
                              ))}
                            </div>
                          )}
                          {item.doacoes?.length && (
                            <div class="w-full gap-4 rounded-xl bg-base-300 px-4 py-6">
                              <p class="text-lg">Doações</p>
                              <div class="divider"></div>
                              {item.doacoes.map((doacao) => (
                                <div class="hover:cursor-pointer hover:underline">
                                  R$ {doacao.valor}
                                </div>
                              ))}
                            </div>
                          )}
                          {item.vice_candidato !== null && (
                            <div class="w-full gap-4 rounded-xl bg-base-300 px-4 py-6">
                              <p class="text-lg">Vice Candidato</p>
                              <div class="divider"></div>
                              <div class="hover:cursor-pointer hover:underline">
                                {item.vice_candidato.nome}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </>
              );
            }}
          </Show>
        )}
        {tab() == 1 && (
          <Show when={cargos()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.nome}
                            </p>
                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () => await deleteCargo(item.id)}
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
        {tab() == 2 && (
          <Show when={partidos()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.nome}
                            </p>
                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () => await deletePartido(item.id)}
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
        {tab() == 3 && (
          <Show when={doacoes()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato: {item.candidato?.nome}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato ID: {item.candidato_id}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {new Date(item.data).getFullYear()}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.valor}
                            </p>
                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () => await deleteDoacao(item.id)}
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
        {tab() == 4 && (
          <Show when={processosJudiciais()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato: {item.candidato?.nome}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato ID: {item.candidato_id}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {new Date(item.data_inicio).getFullYear()} -{" "}
                              {item.data_termino &&
                                new Date(item.data_termino).getFullYear()}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.resultado}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.status}
                            </p>
                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () =>
                                await deleteProcessoJudicial(item.id)
                              }
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
        {tab() == 5 && (
          <Show when={equipesApoio()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato: {item.candidato?.nome}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Candidato ID: {item.candidato_id}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.ano}
                            </p>

                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () =>
                                await deleteEquipeApoio(item.id)
                              }
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
        {tab() == 6 && (
          <Show when={pessoas()} fallback={<p>Carregando...</p>}>
            {(data) => {
              return (
                <>
                  <div class="w-11/12 rounded-xl bg-base-200 p-7">
                    {data()?.length &&
                      data().map((item, index) => (
                        <>
                          <div class="flex items-center justify-between">
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.id}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              {item.nome}
                            </p>
                            <p class="text-xl hover:cursor-pointer hover:underline">
                              Nascimento:{" "}
                              {new Date(item.data_nascimento).getMonth()}/
                              {new Date(item.data_nascimento).getFullYear()}
                            </p>
                            <button
                              class="btn btn-error text-lg text-red-800 hover:cursor-pointer hover:underline"
                              onClick={async () => await deletePessoa(item.id)}
                            >
                              deletar
                            </button>
                          </div>
                          {data()?.length - 1 > index && (
                            <div class="divider"></div>
                          )}
                        </>
                      ))}
                  </div>
                </>
              );
            }}
          </Show>
        )}
      </div>
    </>
  );
};

export default App;
