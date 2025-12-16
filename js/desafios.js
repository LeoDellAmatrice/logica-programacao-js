export const Desafios = [
  {
    titulo: "Olá Mundo",
    instrucoes: "Use console.log para imprimir a mensagem 'Olá, Mundo!' na tela.\n\n💡 Dica: console.log('texto') serve para mostrar algo na tela.",
    unlockComplete: ['console', '.log', 'log'],
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg; }
        };
        const result = func(fakeConsole);
        return result.includes("Olá, Mundo!");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Criando variáveis",
    instrucoes: "Crie uma variável chamada nome e atribua a ela o valor 'Maria'.\n\n💡 Dica: para criar variáveis usamos let ou const, exemplo: let idade = 20;",
    unlockComplete: ['let', 'const'],
    validar: (code) => {
      try {
        const func = new Function(`
          ${code}
          return typeof nome !== "undefined" && nome === "Maria";
        `);
        return func();
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Operações matemáticas",
    instrucoes: "Crie uma variável soma que seja o resultado de 2 + 3.\n\n💡 Dica: você pode usar operadores matemáticos como +, -, *, / para calcular valores.",
    unlockComplete: [],
    validar: (code) => {
      try {
        const func = new Function(`
          ${code}
          return typeof soma !== "undefined" && soma === 5;
        `);
        return func();
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Condicional simples",
    instrucoes: "Crie uma variável idade com valor 18 e use if/else para imprimir 'maior de idade' se idade >= 18, senão 'menor de idade'.\n\n💡 Dica: estrutura básica:\nif (condicao) {\n  // código se for verdadeiro\n} else {\n  // código se for falso\n}",
    unlockComplete: ['if', 'else'],
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg; }
        };
        const result = func(fakeConsole);
        return result.includes("maior de idade") || result.includes("menor de idade");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Loop for",
    instrucoes: "Use um loop for para imprimir os números de 1 a 5.\n\n💡 Dica: estrutura básica:\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    unlockComplete: ['for'],
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg + "\\n"; }
        };
        const result = func(fakeConsole);
        return result.includes("1") && result.includes("5") && !result.includes("6");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "While loop",
    instrucoes: "Use um loop while para imprimir os números de 1 a 3.\n\n💡 Dica: estrutura básica:\nlet i = 1;\nwhile (i <= 3) {\n  console.log(i);\n  i++;\n}",
    unlockComplete: ['while'],
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg + "\\n"; }
        };
        const result = func(fakeConsole);
        return result.includes("1") && result.includes("2") && result.includes("3");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Arrays básicos",
    instrucoes: "Crie um array chamado frutas contendo 'maçã', 'banana' e 'laranja'.\n\n💡 Dica: arrays guardam listas de valores. Exemplo: let numeros = [1, 2, 3];",
    validar: (code) => {
      try {
        const func = new Function(`
          ${code}
          return Array.isArray(frutas) && frutas.includes("maçã") && frutas.includes("banana") && frutas.includes("laranja");
        `);
        return func();
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Acessando elementos do array",
    instrucoes: "Crie um array numeros com os valores 10, 20 e 30. Imprima o segundo valor do array.\n\n💡 Dica: para acessar usamos índices, começando do 0. Exemplo: numeros[1] pega o segundo valor.",
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg; }
        };
        const result = func(fakeConsole);
        return result.includes("20");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Funções básicas",
    instrucoes: "Crie uma função chamada saudacao que recebe um nome e imprime 'Olá, ' seguido do nome.\n\n💡 Dica: funções são criadas assim:\nfunction nomeDaFuncao(parametro) {\n  // código\n}",
    unlockComplete: ['function'],
    validar: (code) => {
      try {
        const func = new Function("console", `
          ${code}
          saudacao("João");
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg; }
        };
        const result = func(fakeConsole);
        return result.includes("Olá, João");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Função com retorno",
    instrucoes: "Crie uma função chamada dobro que recebe um número e retorna o dobro dele.\n\n💡 Dica: para retornar um valor usamos return. Exemplo:\nfunction soma(a, b) {\n  return a + b;\n}",
    unlockComplete: ['return'],
    validar: (code) => {
      try {
        const func = new Function(`
          ${code}
          return typeof dobro === "function" && dobro(4) === 8;
        `);
        return func();
      } catch {
        return false;
      }
    }
  }
];
