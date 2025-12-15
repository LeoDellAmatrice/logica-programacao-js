export function ErrorTranslator() {

  function traduzir(erro) {
    if (!erro || !erro.name) {
      return "Ocorreu um erro desconhecido no código.";
    }

    switch (erro.name) {
      case "ReferenceError":
        return traduzirReferenceError(erro.message);

      case "SyntaxError":
        return traduzirSyntaxError(erro.message);

      case "TypeError":
        return traduzirTypeError(erro.message);

      case "RangeError":
        return "O código entrou em um loop infinito ou usou um valor inválido."

      default:
        return `Erro: ${erro} msg:${erro.message}`;
    }
  }

  // =========================
  // ERROS ESPECÍFICOS
  // =========================

  function traduzirReferenceError(msg) {
    const match = msg.match(/(.+) is not defined/);

    if (match) {
      return `Você usou a variável "${match[1]}", mas ela não foi criada antes.`;
    }

    return "Você tentou usar algo que não existe.";
  }

  function traduzirSyntaxError(msg) {
    
    if (msg.startsWith("Unexpected token")) {
      return "Há um símbolo em um lugar inesperado no código.";
    }
    if (msg.includes("Unexpected end of input")) {
      return "O código terminou antes de fechar todas as chaves ou parênteses.";
    }

    return "Erro de escrita no código. Verifique parênteses e chaves.";
  }

  function traduzirTypeError(msg) {
    if (msg.includes("is not a function")) {
      return "Você tentou chamar algo como função, mas isso não é uma função.";
    }
    if (msg.includes("Cannot read properties")) {
      return "Você tentou acessar uma propriedade de algo que não existe.";
    }
    return "Você usou algo de uma forma inválida.";
  }

  return {
    traduzir
  };
}
