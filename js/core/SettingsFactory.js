import { settingsStore } from '../core/SettingsStore.js';

export function SettingsFactory(editor) {
  function applyAll() {
    const settings = settingsStore.getAll();

    console.log(settings)

    editor.setTheme(settings.theme);
    editor.setFontSize(settings.fontSize);
    editor.setAutocomplete(settings.autocomplete);
    editor.setHighlightLine(settings.highlightLine);
  }

  function update(key, value) {
    settingsStore.set(key, value);
    this.applyAll();
  }

  return {
    applyAll,
    update
  }
};
