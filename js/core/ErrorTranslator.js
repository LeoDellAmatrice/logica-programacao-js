export function ErrorTranslator() {

  function traduzir(erro) {
    if (!erro || !erro.name) {
      return "Ocorreu um erro desconhecido no código.";
    }

    switch (erro.name) {
      case "ReferenceError":
        return traduzirReferenceError(erro);

      case "SyntaxError":
        return traduzirSyntaxError(erro);

      case "TypeError":
        return traduzirTypeError(erro);

      default:
        return `Erro: ${erro.message}`;
    }
  }

  // =========================
  // ERROS ESPECÍFICOS
  // =========================

  function traduzirReferenceError(erro) {
    const match = erro.message.match(/(.+) is not defined/);

    if (match) {
      return `Você usou a variável "${match[1]}", mas ela não foi criada antes.`;
    }

    return "Você tentou usar algo que não existe.";
  }

  function traduzirSyntaxError(erro) {
    return (
      "Erro de sintaxe: parece que há um problema na escrita do código. " +
      "Verifique parênteses (), chaves {} e ponto e vírgula."
    );
  }

  function traduzirTypeError(erro) {
    return (
      "Erro de tipo: você tentou usar algo de uma forma inválida. " +
      "Por exemplo, chamar algo que não é uma função."
    );
  }

  return {
    traduzir
  };
}
