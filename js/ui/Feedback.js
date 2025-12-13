export function Feedback() {
  const el = document.getElementById("feedback");

  function show(text, type = "") {
    el.textContent = text;
    el.className = "feedback " + type;
  }

  function clear() {
    show("");
  }

  return { show, clear };
}
