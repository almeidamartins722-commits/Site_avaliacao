const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");
const searchInput = document.querySelector("#searchInput");
const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");
let cartItems = 0;

function applyFilter(filter = "todos") {
  const search = (searchInput?.value || "").trim().toLowerCase();

  products.forEach((product) => {
    const tags = product.dataset.tags || "";
    const text = product.innerText.toLowerCase();
    const matchesFilter = filter === "todos" || tags.includes(filter);
    const matchesSearch = !search || text.includes(search) || tags.includes(search);
    product.classList.toggle("hidden", !(matchesFilter && matchesSearch));
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyFilter(button.dataset.filter);
  });
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.filterLink;
    const button = document.querySelector(`.filter[data-filter="${target}"]`);
    if (button) button.click();
  });
});

searchInput?.addEventListener("input", () => {
  const active = document.querySelector(".filter.active")?.dataset.filter || "todos";
  applyFilter(active);
});

document.querySelectorAll(".price-row button").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = String(cartItems);
    if (toast) {
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 1700);
    }
  });
});
