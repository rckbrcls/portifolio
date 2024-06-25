import Header from "../components/Header";
import CardCadastro from "../components/CardCadastro";
import ListaUsers from "../components/ListaUsers";
import Sorteio from "../components/Sorteio";

export default function Home() {
  return (
    <>
      <Header />
      <Sorteio />
      <CardCadastro />
      <ListaUsers />
    </>
  );
}
