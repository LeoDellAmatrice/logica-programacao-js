const DEFAULT_SETTINGS = {
  theme: 'railscasts',
  fontSize: 16,
  autocomplete: true,
  highlightLine: true,
  clearEditor: false
};

class SettingsStore {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.load();
  }

  load() {
    const saved = localStorage.getItem('settings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }

  save() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
    this.save();
  }

  getAll() {
    return { ...this.settings };
  }
}

export const settingsStore = new SettingsStore();
