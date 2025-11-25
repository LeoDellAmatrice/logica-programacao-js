import { Desafios } from "./desafios.js";

let editor;
let desafioAtual = 0;

console.log(Desafios[0].titulo);

window.onload = () => {
    editor = CodeMirror(document.getElementById("editor"), {
        mode: "javascript",
        theme: "default",
        lineNumbers: true,
        value: "// Escreva seu código aqui"
    });
    carregarDesafio();
};

function carregarDesafio() {

    document.getElementById("titulo").textContent = Desafios[desafioAtual].titulo;
    document.getElementById("instrucoes").textContent = Desafios[desafioAtual].instrucoes;
    document.getElementById("feedback").textContent = "";
    document.getElementById("output").textContent = "";

    const textTemplate = Desafios[desafioAtual].template ? Desafios[desafioAtual].template + '\n//\n': "";

    editor.setValue(textTemplate + "// Escreva seu código aqui\n");

}

function executar() {
  const code = editor.getValue();
  const feedback = document.getElementById("feedback");
  const output = document.getElementById("output");

  try {
    const valido = Desafios[desafioAtual].validar(code);
    if (valido) {
      feedback.textContent = "✅ Parabéns! Você completou o desafio.";
    } else {
      feedback.textContent = "❌ Ainda não está certo. Tente novamente.";
    }

    // Mostrar saída do código do usuário
    try {
      const fakeConsole = {
        _output: "",
        log: (msg) => { fakeConsole._output += msg + "\n"; }
      };
      const userFunc = new Function("console", code);
      userFunc(fakeConsole);
      output.textContent = fakeConsole._output || "Código rodou sem saída.";
    } catch {
      output.textContent = "Erro ao executar saída.";
    }

  } catch (e) {
    feedback.textContent = "Erro no código: " + e.message;
    output.textContent = "";
  }
}


function proximoDesafio() {
    if (desafioAtual < Desafios.length - 1) {
        desafioAtual++;
        carregarDesafio();
    } else {
        document.getElementById("feedback").textContent = "🎉 Você completou todos os desafios!";
    }
}

document.getElementById("btn-executar").addEventListener("click", executar);
document.getElementById("btn-proximo").addEventListener("click", proximoDesafio);