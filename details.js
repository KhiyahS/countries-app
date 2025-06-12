const container = document.getElementById("country-detail-container");

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

if (!countryName) {
  container.innerHTML = "<p>No country selected.</p>";
} else {
  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
    .then(res => {
      if (!res.ok) throw new Error("Country not found.");
      return res.json();
    })
    .then(data => {
  const c = data[0];

  const languages = c.languages ? Object.values(c.languages).join(", ") : "N/A";
  const currencies = c.currencies
    ? Object.values(c.currencies).map(cur => cur.name).join(", ")
    : "N/A";

  let bordersHTML = "None";

  if (c.borders && c.borders.length > 0) {
    // Fetch names for border countries by their codes
    const borderCodes = c.borders.join(",");
    fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`)
      .then(res => res.json())
      .then(borderData => {
        bordersHTML = borderData
          .map(border => `<a href="details.html?name=${encodeURIComponent(border.name.common)}">${border.name.common}</a>`)
          .join(", ");
        
        container.querySelector("#borders").innerHTML = `<strong>Borders:</strong> ${bordersHTML}`;
      });
  }

  container.innerHTML = `
    <h1>${c.name.common}</h1>
    <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" style="width: 200px; border-radius: 10px;" />
    <p><strong>Capital:</strong> ${c.capital?.[0] || "N/A"}</p>
    <p><strong>Region:</strong> ${c.region}</p>
    <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currencies:</strong> ${currencies}</p>
    <p id="borders"><strong>Borders:</strong> Loading...</p>
  `;
})


      container.innerHTML = `
        <h1>${c.name.common}</h1>
        <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" style="width: 200px; border-radius: 10px;" />
        <p><strong>Capital:</strong> ${c.capital?.[0] || "N/A"}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
        <p><strong>Borders:</strong> ${borders}</p>
      `;
    })
    .catch(err => {
      container.innerHTML = `<p>Error loading country details: ${err.message}</p>`;
    });
}
