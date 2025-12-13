export function Output(editor, feedback) {
  const el = document.getElementById("output");

  function set(text) {
    el.textContent = text;
  }

  function clear() {
    el.textContent = "";
    editor.limparDestaques();
    feedback.clear();
  }

  return { set, clear };
}
