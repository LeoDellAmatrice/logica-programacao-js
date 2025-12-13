import { EditorFactory } from "./core/EditorFactory.js";
import { StorageFactory } from "./core/StorageFactory.js";
import { DesafioFactory } from "./core/DesafioFactory.js";
import { Feedback } from "./ui/Feedback.js";
import { Output } from "./ui/Output.js";
import { AppController } from "./controllers/AppController.js";

window.onload = () => {
  const editor = EditorFactory();
  editor.create("editor", {
    value: "// Bem-vindo!\n"
  });

  const storage = StorageFactory();
  const desafios = DesafioFactory(storage);
  const feedback = Feedback();
  const output = Output(editor, feedback);

  const app = AppController(editor, desafios, feedback, output);
  app.carregarDesafio();

  document.getElementById("btn-executar").onclick = app.executar;
  document.getElementById("btn-proximo").onclick = app.proximoDesafio;
  document.getElementById("btn-anterior").onclick = app.desafioAnterior;

  document.getElementById("btn-theme-editor").onclick = editor.toggleTheme;
  document.getElementById("btn-limpar-console").onclick = output.clear;
};
