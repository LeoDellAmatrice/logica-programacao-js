export function ErrorTranslator() {

  function traduzir(erro) {
    if (!erro || !erro.name) {
      return {
        text: "Ocorreu um erro desconhecido no código.",
        type: 'error',
        line: null
      };
    }

    switch (erro.name) {
      case "ReferenceError":
        return traduzirReferenceError(erro.message);

      case "SyntaxError":
        return traduzirSyntaxError(erro.message);

      case "TypeError":
        return traduzirTypeError(erro.message);

      case "RangeError":
        return {
          text: "O código usou um valor inválido ou entrou em um loop infinito.",
          hint: "Confira condições de repetição como while e for.",
          type: 'error',
          line: null
        };

      default:
        return {
          text: "Ocorreu um erro inesperado no código.",
          hint: "Tente simplificar o código e executar novamente.",
          type: 'error',
          line: null
        };
    }
  }

  // =========================
  // ERROS ESPECÍFICOS
  // =========================

  function traduzirReferenceError(msg) {
    const match = msg.match(/(.+) is not defined/);

    if (match) {
      return {
        text: `Você usou a variável "${match[1]}", mas ela não foi criada antes.`,
        hint: `Crie essa variável antes de usá-la,\npor exemplo: let ${match[1]} = ...`,
        type: 'error',
        line: null
      };
    }

    return {
      text: "Você tentou usar algo que não existe no código.",
      hint: "Verifique se o nome da variável está correto e se ela foi criada.",
      type: 'error',
      line: null
    };
  }

  function traduzirSyntaxError(msg) {

    if (msg.startsWith("Unexpected token")) {
      return {
        text: "Há um símbolo em um lugar inesperado no código.",
        hint: "Verifique se não falta ou sobra alguma vírgula, chave {} ou parêntese ().",
        type: 'error',
        line: null
      };
    }

    if (msg.includes("Unexpected end of input")) {
      return {
        text: "O código terminou antes de ser finalizado corretamente.",
        hint: "Veja se todas as chaves {}, colchetes [] e parênteses () foram fechados.",
        type: 'error',
        line: null
      };
    }

    return {
      text: "Existe um erro de escrita no código.",
      hint: "Leia o código com calma e confira a estrutura das linhas.",
      type: 'error',
      line: null
    };
  }

  function traduzirTypeError(msg) {

    if (msg.includes("is not a function")) {
      return {
        text: "Algo foi chamado como função, mas não é uma função.",
        hint: "Confira se você usou parênteses () apenas em funções e escreveu o nome dela corretamente.",
        type: 'error',
        line: null
      };
    }

    if (msg.includes("Cannot read properties")) {
      return {
        text: "Você tentou acessar uma propriedade de algo que não existe.",
        hint: "Verifique se a variável não está undefined ou null antes de usá-la.",
        type: 'error',
        line: null
      };
    }

    return {
      text: "Algo foi usado de forma incorreta.",
      hint: "Verifique o tipo da variável e como ela está sendo usada.",
      type: 'error',
      line: null
    };
  }

  return {
    traduzir
  };
}
