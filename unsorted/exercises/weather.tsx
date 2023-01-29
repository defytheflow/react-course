import React from "react";

type City = {
  city: any;
  data: any;
};

export default function WeatherApp() {
  // const [cityData, setCityData] = React.useState(null)
  const [city, setCity] = React.useState("");
  const [cityError, setCityError] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<City[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (city.length === 0) {
      setCityError("Please enter a city");
      return;
    }

    const cityData = await fetchCity(city);
    setCity("");
    // setCityData(cityData)
    setCityError(null);
    setHistory(prevHistory => [{ city, data: cityData }, ...prevHistory].slice(0, 10));
  }

  const historyCities = history.map(({ city, data }, i) => (
    <WeatherBox
      key={i}
      city={city[0].toUpperCase() + city.slice(1).toLowerCase()}
      data={data}
    />
  ));

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search for a city"
            name="city"
            aria-invalid={Boolean(cityError)}
            aria-describedby="city-error"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button className="btn-submit" type="submit">
            Search
          </button>
          {cityError && (
            <div id="city-error" role="alert">
              {cityError}
            </div>
          )}
        </form>
      </div>
      {historyCities}
    </div>
  );
}

function WeatherBox({ city, data }: City) {
  return (
    <div className="weather-box-wrapper">
      <div className="weather-box">
        <div className="city">{city}</div>
        <div className="temperature">{data.main.temp}</div>
        <div className="weather">{data.weather[0].main}</div>
      </div>
    </div>
  );
}

async function fetchCity(city: string) {
  // NEVER DO SO IN PRODUCTION, API KEYS MUST BE KEPT SECRET ON THE SERVER.
  const apiKey = "d47ae7a9e78b3234c8933b7c67f08f86";
  const params = new URLSearchParams({ q: city, units: "metric", appid: apiKey });
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`
  );
  const data = await response.json();
  return data;
}
