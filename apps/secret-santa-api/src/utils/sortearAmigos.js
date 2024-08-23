// Função que recebe um array de usuários e retorna um array com os usuários com o amigo secreto sorteado
export default function sortearAmigos(users) {
  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  const amigosSecretos = shuffle(users.slice());

  const sorteio = amigosSecretos.map((user, index) => {
    const amigoSecreto = amigosSecretos[index + 1] || amigosSecretos[0];
    return {
      ...user,
      amigoSecreto,
    };
  });

  return sorteio;
}
