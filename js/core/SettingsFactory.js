import { settingsStore } from '../core/SettingsStore.js';

export function SettingsFactory(editor, desafios) {
  function applyAll() {
    const settings = settingsStore.getAll();

    editor.setTheme(settings.theme);
    editor.setFontSize(settings.fontSize);
    editor.setAutocomplete(settings.autocomplete);
    editor.setHighlightLine(settings.highlightLine);
    editor.setClearEditor(settings.clearEditor);
  }

  function resetDesafio(){
    desafios.resetAll();
  }

  function update(key, value) {
    settingsStore.set(key, value);
    this.applyAll();
  }

  return {
    applyAll,
    update,
    resetDesafio
  }
};
