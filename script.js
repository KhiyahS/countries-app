const container = document.getElementById("countries-container");

fetch("https://restcountries.com/v3.1/alpha?codes=jm,cn,ca&fields=name,flags")
  .then(res => res.json())
  .then(countries => {
    container.innerHTML = countries.map(c => `
      <div class="country">
        <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" />
        <h2>${c.name.common}</h2>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error("Error fetching countries:", err);
    container.innerHTML = "<p>Could not load flags.</p>";
  });



