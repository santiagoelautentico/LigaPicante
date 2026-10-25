const input = document.getElementById("searchInput");
const rows = document.querySelectorAll("#playersTable tr");
const tbody = document.getElementById("playersTable");

const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const emptyRow = document.createElement("tr");
emptyRow.innerHTML = `<td colspan="4">No se encontraron jugadores</td>`;
emptyRow.style.display = "none";
tbody.appendChild(emptyRow);

input.addEventListener("input", () => {
  const query = normalize(input.value);
  let visible = 0;

  rows.forEach((row) => {
    const name = normalize(row.querySelector(".player-cell span").textContent);
    const match = name.includes(query);
    row.style.display = match ? "" : "none";
    if (match) visible++;
  });

  emptyRow.style.display = visible === 0 ? "" : "none";
});