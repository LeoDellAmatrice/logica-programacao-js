export function HeaderUI() {
  const status = document.getElementById("header-status");

  function setStatus(type) {
    status.className = `header-status ${type}`;
    setTimeout(() => status.className = "header-status", 2500);
  }

  return { setStatus };
}
