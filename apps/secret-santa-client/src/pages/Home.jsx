import Header from "../components/Header";
import CardCadastro from "../components/CardCadastro";
import ListaUsers from "../components/ListaUsers";
import Sorteio from "../components/Sorteio";

export default function Home() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Header />
      <Sorteio />
      <CardCadastro />
      <ListaUsers />
    </div>
  );
}
