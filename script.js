const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search-input");
const regionSelect = document.getElementById("region-select");

let allCountries = [];

function displayCountries(countries) {
  container.innerHTML = countries.length
    ? countries.map(c => `
        <a class="country" href="details.html?name=${encodeURIComponent(c.name.common)}">
          <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" />
          <h2>${c.name.common}</h2>
        </a>
      `).join('')
    : "<p>No countries found.</p>";
}

function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRegion = regionSelect.value;

  const filtered = allCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
    const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  displayCountries(filtered);
}

fetch("https://restcountries.com/v3.1/all?fields=name,flags,region")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(countries => {
    allCountries = countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    displayCountries(allCountries);
  })
  .catch(err => {
    console.error("Error fetching countries:", err);
    container.innerHTML = "<p>Could not load flags.</p>";
  });

searchInput.addEventListener("input", filterCountries);
regionSelect.addEventListener("change", filterCountries);






