function executeUserCode(code) {
  try {
    const fakeConsole = {
      output: "",
      log(msg) {
        this.output += msg + "\n";
      }
    };

    const context = {};

    const sandbox = new Proxy(context, {
      has() {
        return true; // faz o JS "achar" que a variável existe
      },
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        return true;
      }
    });

    const fn = new Function(
      "console",
      "sandbox",
      `
      with (sandbox) {
        ${code}
      }
    `
    );

    fn(fakeConsole, sandbox);

    return {
      ok: true,
      context,
      consoleOutput: fakeConsole.output.trim()
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message
    };
  }
}


function runRules(exec, rules) {
  if (!exec.ok) {
    return {
      ok: false,
      message: "Erro ao executar o código."
    };
  }

  for (const rule of rules) {
    const result = rule(exec);
    if (!result.ok) return result;
  }

  return { ok: true };
}

const rules = {
  exists(name, message) {
    return (exec) =>
      name in exec.context
        ? { ok: true }
        : { ok: false, message };
  },

  equals(name, value, message) {
    return (exec) =>
      exec.context[name] === value
        ? { ok: true }
        : { ok: false, message };
  },

  isNumber(name, message) {
    return (exec) =>
      typeof exec.context[name] === "number"
        ? { ok: true }
        : { ok: false, message };
  },

  isFunction(name, message) {
    return (exec) =>
      typeof exec.context[name] === "function"
        ? { ok: true }
        : { ok: false, message };
  },

  functionReturns(name, arg, expected, message) {
    return (exec) =>
      exec.context[name](arg) === expected
        ? { ok: true }
        : { ok: false, message };
  },

  consoleIncludes(text, message) {
    return (exec) =>
      exec.consoleOutput.includes(text)
        ? { ok: true }
        : { ok: false, message };
  }
};


const validators = [
  // 01 - Olá Mundo
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.consoleIncludes(
        "Olá, Mundo",
        "Use console.log para imprimir 'Olá, Mundo!'."
      )
    ]);
  },

  // 02 - Criando variáveis
  (code) => {
    const exec = executeUserCode(code);
    console.log(exec.context)
    return runRules(exec, [
      rules.exists(
        "nome",
        "A variável nome não foi criada."
      ),
      rules.equals(
        "nome",
        "Maria",
        "A variável nome deve ter o valor 'Maria'."
      )
    ]);
  },

  // 03 - Operações matemáticas
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.exists(
        "soma",
        "A variável soma não foi criada."
      ),
      rules.isNumber(
        "soma",
        "A variável soma deve ser numérica."
      ),
      rules.equals(
        "soma",
        5,
        "A variável soma deve ser igual a 5."
      )
    ]);
  },

  // 04 - Condicional simples
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.exists(
        "idade",
        "A variável idade não foi criada."
      ),
      (exec) =>
        exec.context.idade >= 18
          ? rules.consoleIncludes(
              "maior de idade",
              "Para idade >= 18, imprima 'maior de idade'."
            )(exec)
          : rules.consoleIncludes(
              "menor de idade",
              "Para idade < 18, imprima 'menor de idade'."
            )(exec)
    ]);
  },

  // 05 - Loop for
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.consoleIncludes(
        "1",
        "O loop deve começar imprimindo 1."
      ),
      rules.consoleIncludes(
        "5",
        "O loop deve imprimir o número 5."
      ),
      (exec) =>
        !exec.consoleOutput.includes("0") &&
        !exec.consoleOutput.includes("6")
          ? { ok: true }
          : { ok: false, message: "O loop deve imprimir apenas números de 1 a 5." }
    ]);
  },

  // 06 - While loop
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.consoleIncludes(
        "1",
        "O while deve imprimir o número 1."
      ),
      rules.consoleIncludes(
        "2",
        "O while deve imprimir o número 2."
      ),
      rules.consoleIncludes(
        "3",
        "O while deve imprimir o número 3."
      ),
      (exec) =>
        !exec.consoleOutput.includes("4")
          ? { ok: true }
          : { ok: false, message: "O while deve imprimir apenas números de 1 a 3." }
    ]);
  },

  // 07 - Arrays básicos
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.exists(
        "frutas",
        "O array frutas não foi criado."
      ),
      (exec) =>
        Array.isArray(exec.context.frutas)
          ? { ok: true }
          : { ok: false, message: "frutas deve ser um array." },
      (exec) =>
        exec.context.frutas.includes("maçã")
          ? { ok: true }
          : { ok: false, message: "O array deve conter 'maçã'." },
      (exec) =>
        exec.context.frutas.includes("banana")
          ? { ok: true }
          : { ok: false, message: "O array deve conter 'banana'." },
      (exec) =>
        exec.context.frutas.includes("laranja")
          ? { ok: true }
          : { ok: false, message: "O array deve conter 'laranja'." }
    ]);
  },

  // 08 - Acessando elementos do array
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.consoleIncludes(
        "20",
        "Você deve imprimir o segundo valor do array (20)."
      )
    ]);
  },

  // 09 - Funções básicas
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.exists(
        "saudacao",
        "A função saudacao não foi criada."
      ),
      rules.isFunction(
        "saudacao",
        "saudacao deve ser uma função."
      ),
      (exec) => {
        exec.context.saudacao("João");
        return rules.consoleIncludes(
          "Olá, João",
          "A função deve imprimir 'Olá, João'."
        )(exec);
      }
    ]);
  },

  // 10 - Função com retorno
  (code) => {
    const exec = executeUserCode(code);
    return runRules(exec, [
      rules.exists(
        "dobro",
        "A função dobro não foi criada."
      ),
      rules.isFunction(
        "dobro",
        "dobro deve ser uma função."
      ),
      rules.functionReturns(
        "dobro",
        4,
        8,
        "A função dobro deve retornar o dobro do número."
      )
    ]);
  }
];

export const Desafios = [
  {
    titulo: "Olá Mundo",
    instrucoes: "Use console.log para imprimir a mensagem 'Olá, Mundo!' na tela.\n\n💡 Dica: console.log('texto') serve para mostrar algo na tela.",
    unlockComplete: ['console', '.log', 'log'],
    validar: validators[0]
  },
  {
    titulo: "Criando variáveis",
    instrucoes: "Crie uma variável chamada nome e atribua a ela o valor 'Maria'.\n\n💡 Dica: para criar variáveis usamos let ou const, exemplo: let idade = 20;",
    unlockComplete: ['let', 'const'],
    validar: validators[1]
  },
  {
    titulo: "Operações matemáticas",
    instrucoes: "Crie uma variável soma que seja o resultado de 2 + 3.\n\n💡 Dica: você pode usar operadores matemáticos como +, -, *, / para calcular valores.",
    unlockComplete: [],
    validar: validators[2]
  },
  {
    titulo: "Condicional simples",
    instrucoes: "Crie uma variável idade com valor 19 e use if/else para imprimir 'maior de idade' se idade >= 18, senão 'menor de idade'.\n\n💡 Dica: estrutura básica:\nif (condicao) {\n  // código se for verdadeiro\n} else {\n  // código se for falso\n}",
    unlockComplete: ['if', 'else'],
    validar: validators[3]
  },
  {
    titulo: "Loop for",
    instrucoes: "Use um loop for para imprimir os números de 1 a 5.\n\n💡 Dica: estrutura básica:\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    unlockComplete: ['for'],
    validar: validators[4]
  },
  {
    titulo: "While loop",
    instrucoes: "Use um loop while para imprimir os números de 1 a 3.\n\n💡 Dica: estrutura básica:\nlet i = 1;\nwhile (i <= 3) {\n  console.log(i);\n  i++;\n}",
    unlockComplete: ['while'],
    validar: validators[5]
  },
  {
    titulo: "Arrays básicos",
    instrucoes: "Crie um array chamado frutas contendo 'maçã', 'banana' e 'laranja'.\n\n💡 Dica: arrays guardam listas de valores. Exemplo: let numeros = [1, 2, 3];",
    unlockComplete: [],
    validar: validators[6]
  },
  {
    titulo: "Acessando elementos do array",
    instrucoes: "Crie um array numeros com os valores 10, 20 e 30. Imprima o segundo valor do array.\n\n💡 Dica: para acessar usamos índices, começando do 0. Exemplo: numeros[1] pega o segundo valor.",
    unlockComplete: [],
    validar: validators[7]
  },
  {
    titulo: "Funções básicas",
    instrucoes: "Crie uma função chamada saudacao que recebe um nome e imprime 'Olá, ' seguido do nome.\n\n💡 Dica: funções são criadas assim:\nfunction nomeDaFuncao(parametro) {\n  // código\n}",
    unlockComplete: ['function'],
    validar: validators[8]
  },
  {
    titulo: "Função com retorno",
    instrucoes: "Crie uma função chamada dobro que recebe um número e retorna o dobro dele.\n\n💡 Dica: para retornar um valor usamos return. Exemplo:\nfunction soma(a, b) {\n  return a + b;\n}",
    unlockComplete: ['return'],
    validar: validators[9]
  }
];

