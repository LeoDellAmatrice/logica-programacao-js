import { Desafios } from './desafios.js';

let editor;
let desafioAtual = 0;

window.onload = () => {
  carregarEditorCodeMirror();
  carregarDesafio();
};

function carregarEditorCodeMirror(theme = "default", value = "// Bem-vindo! Escreva seu código aqui\n// Use console.log() para ver a saída no console à direita.\n") {
  editor = CodeMirror(document.getElementById("editor"), {
    mode: "javascript",
    theme: theme,
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    value: value
  });
}

function feedbackMenssage(text, type){
  const feedback = document.getElementById("feedback");

  feedback.textContent = text;

  feedback.className = "feedback " + type;

}


function carregarDesafio() {
  document.getElementById("titulo").textContent = Desafios[desafioAtual].titulo;
  document.getElementById("instrucoes").textContent = Desafios[desafioAtual].instrucoes;
  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.className = "feedback";
  document.getElementById("output").textContent = "";
  editor.setValue("// Escreva seu código aqui\n");
}

function executar() {
  const code = editor.getValue();
  const output = document.getElementById("output");

  try {
    const valido = Desafios[desafioAtual].validar(code);

    if (valido) {
      feedbackMenssage("Parabéns! Você completou o desafio.", "success")
    } else {
      feedbackMenssage("Ainda não está certo. Tente novamente.", "error")
    }

    // Captura saída do usuário
    try {
      const fakeConsole = {
        _output: "",
        log: (msg) => { fakeConsole._output += String(msg) + "\n"; }
      };
      const userFunc = new Function("console", code);
      userFunc(fakeConsole);

      output.textContent = fakeConsole._output || "Código rodou sem saída.";
    } catch (e){
      output.textContent = "Erro ao executar saída. \n" + e;
    }

  } catch (e) {
    feedback.textContent = "Erro no código: " + e.message;
    feedback.className = "feedback error";
    output.textContent = "";
  }
}

function proximoDesafio() {
  if (desafioAtual < Desafios.length - 1) {
    desafioAtual++;
    carregarDesafio();
  } else {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "🎉 Você completou todos os desafios!";
    feedback.className = "feedback success";
  }
}

function desafioAnterior() {
  if (desafioAtual > 0) {
    desafioAtual--;
    carregarDesafio();
  }
}

function trocarThemaEditor() {
  const editorElement = document.getElementById('editor');

  editorElement.innerHTML = "";

  const editorCode = editor.getValue();

  if (editor.getOption("theme") === "default") {
    carregarEditorCodeMirror("dark", editorCode);
  } else {
    carregarEditorCodeMirror("default", editorCode);
  }

  editorElement.classList.toggle('codeMirror-Dark');
}

function limparConsole(){
  const output = document.getElementById("output");
  output.textContent = "";
}

document.getElementById("btn-executar").onclick = executar;
document.getElementById("btn-proximo").onclick = proximoDesafio;
document.getElementById("btn-anterior").onclick = desafioAnterior;

document.getElementById('btn-theme-editor').addEventListener('click', trocarThemaEditor);
document.getElementById('btn-limpar-console').addEventListener('click', limparConsole);