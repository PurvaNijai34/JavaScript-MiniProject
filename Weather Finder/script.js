document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const location = document.getElementById("locationInput").value.trim();
  const apiKey = "d2c830dc5f91402ca9482630253105";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const weatherResult = document.getElementById("weatherResult");

      document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById("temperature").textContent = data.current.temp_c;
      document.getElementById("condition").textContent = data.current.condition.text;
      document.getElementById("icon").src = `https:${data.current.condition.icon}`;

      weatherResult.classList.remove("hidden");
      document.getElementById("error").classList.add("hidden");
    })
    .catch(() => {
      document.getElementById("weatherResult").classList.add("hidden");
      document.getElementById("error").classList.remove("hidden");
    });
});

document.getElementById("resetBtn").addEventListener("click", function () {
  document.getElementById("locationInput").value = "";
  document.getElementById("weatherResult").classList.add("hidden");
  document.getElementById("error").classList.add("hidden");
});

