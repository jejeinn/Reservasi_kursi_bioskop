// Konfigurasi
const rows = 6;
const cols = 10;
const seatPrice = 35000;

// Kursi yang sudah terpesan
const preBooked = new Set(["A3", "B7", "C1", "D10"]);

const theater = document.getElementById("theater");
const selectedListEl = document.getElementById("selectedList");
const totalEl = document.getElementById("total");
const reserveBtn = document.getElementById("reserveBtn");
const resetBtn = document.getElementById("resetBtn");

const selected = new Set();
const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Buat kursi
for (let r = 0; r < rows; r++) {
  for (let c = 1; c <= cols; c++) {
    const id = rowLetters[r] + c;
    const div = document.createElement("div");
    div.className = "seat";
    div.dataset.id = id;

    if (preBooked.has(id)) {
      div.classList.add("booked");
    } else {
      div.addEventListener("click", () => toggleSelect(div));
    }

    theater.appendChild(div);
  }
}

function toggleSelect(el) {
  const id = el.dataset.id;
  if (el.classList.contains("booked")) return;

  if (el.classList.contains("selected")) {
    el.classList.remove("selected");
    selected.delete(id);
  } else {
    el.classList.add("selected");
    selected.add(id);
  }
  updateInfo();
}

function updateInfo() {
  if (selected.size === 0) {
    selectedListEl.textContent = "-";
    reserveBtn.disabled = true;
    totalEl.textContent = "Rp 0";
  } else {
    selectedListEl.textContent = Array.from(selected).join(", ");
    const total = selected.size * seatPrice;
    totalEl.textContent = formatRupiah(total);
    reserveBtn.disabled = false;
  }
}

reserveBtn.addEventListener("click", () => {
  selected.forEach((id) => {
    const el = document.querySelector([data-id='${id}']);
    if (el) {
      el.classList.remove("selected");
      el.classList.add("booked");
    }
  });
  selected.clear();
  updateInfo();
  alert("Kursi berhasil dipesan!");
});

resetBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".seat.selected")
    .forEach((el) => el.classList.remove("selected"));
  selected.clear();
  updateInfo();
});

function formatRupiah(n) {
  return "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Inisialisasi
updateInfo();
