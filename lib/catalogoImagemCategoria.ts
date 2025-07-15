export default function getImagemPorCategoriaDoacao(categoria: string) {
  switch (categoria.toLowerCase()) {
    case "eletronicos":
      return "/produtos/eletronicos-doacao.jpeg";

    case "moveis":
      return "/produtos/moveis-doacao.jpeg";

    case "roupas":
      return "/produtos/roupas-doacao.jpg";

    case "alimentos":
      return "/produtos/alimentos-doacao.jpeg";

    case "brinquedos":
      return "/produtos/brinquedos-doacao.png";

    case "livros":
      return "/produtos/livros-doacao.png";

    case "produtos de limpeza":
      return "/produtos/produtos-limpeza-doacao.jpg";

    default:
      return "/produtos/doarConecta.png";
  }
}  