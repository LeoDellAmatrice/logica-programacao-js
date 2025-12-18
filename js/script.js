import { EditorFactory } from "./core/EditorFactory.js";
import { StorageFactory } from "./core/StorageFactory.js";
import { DesafioFactory } from "./core/DesafioFactory.js";
import { Feedback } from "./ui/Feedback.js";
import { Output } from "./ui/Output.js";
import { IntroModalFactory } from "./ui/IntroModal.js";
import { SettingsModalFactory } from "./ui/SettingsModal.js"
import { SettingsFactory } from "./core/SettingsFactory.js";
import { AppController } from "./controllers/AppController.js";

window.onload = () => {
  const editor = EditorFactory();
  editor.create("editor", {
    value: "// Bem-vindo!\n"
  });


  
  const storage = StorageFactory();
  const desafios = DesafioFactory(storage);
  
  const Settings = SettingsFactory(editor, desafios);
  const SettingsModal = SettingsModalFactory(Settings);

  Settings.applyAll()

  const feedback = Feedback();
  const output = Output(editor, feedback);
  const IntroModal = IntroModalFactory();

  IntroModal.needOpen();

  editor.addToAutoComplete(desafios.getAllUnlock())

  const app = AppController(editor, desafios, feedback, output);

  app.carregarDesafio();

  document.getElementById("icon-setting").onclick = SettingsModal.show;

  document.getElementById("btn-executar").onclick = app.executar;
  document.getElementById("btn-proximo").onclick = app.proximoDesafio;
  document.getElementById("btn-anterior").onclick = app.desafioAnterior;
  
  document.addEventListener("keydown",  function(e) {

    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") app.executar();

    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowRight") app.proximoDesafio();

    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowLeft") app.desafioAnterior();

  });

  document.getElementById("btn-limpar-console").onclick = output.clear;
};
