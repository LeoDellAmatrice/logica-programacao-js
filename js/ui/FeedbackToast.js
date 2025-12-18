export function Feedback() {
  const container = document.getElementById("toast-container");

  function show(text, type = "info", duration = 2500) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = text;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  return { show };
}
