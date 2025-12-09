export const Desafios = [
  {
    titulo: "Desafio 1: Variáveis básicas",
    instrucoes: "Crie uma variável x com valor 5.",
    validar: (code) => {
      try {
        const func = new Function(`
          ${code}
          return typeof x !== "undefined" && x === 5;
        `);
        return func();
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Desafio 2: Condicional simples",
    instrucoes: "Crie uma variável y com valor 10 e use if/else para imprimir 'maior' se y > 5, senão 'menor'.",
    validar: (code) => {
      try {
        let output = "";
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg + "\\n"; }
        };
        const result = func(fakeConsole);
        return result.includes("maior") || result.includes("menor");
      } catch {
        return false;
      }
    }
  },
  {
    titulo: "Desafio 3: Loop for",
    instrucoes: "Use um loop for para imprimir os números de 1 a 3.",
    validar: (code) => {
      try {
        let output = "";
        const func = new Function("console", `
          ${code}
          return console._output;
        `);
        const fakeConsole = {
          _output: "",
          log: (msg) => { fakeConsole._output += msg + "\\n"; }
        };
        const result = func(fakeConsole);
        return result.includes("1") && result.includes("2") && result.includes("3") && !result.includes("4") && !result.includes("0");
      } catch {
        return false;
      }
    }
  }
];
