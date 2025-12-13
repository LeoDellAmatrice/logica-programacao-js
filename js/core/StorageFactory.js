export function StorageFactory(key = "Desafio") {

  function get() {
    return Number(localStorage.getItem(key) ?? 0);
  }

  function set(value) {
    localStorage.setItem(key, value);
  }

  return {
    get,
    set
  };
}
