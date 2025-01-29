import React from "react";
import "./App.css";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "a523d4c9983ad75f683070474f078825";
const API_KEY_PEX = "iRcYr9DBAgpGCSH25y6BSsjmXHCj7PlR4xuTDGJUvWHy22IhqkmQ6QYd";

class App extends React.Component {
  state = {
    temp: undefined,
    feels_like: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    wind: undefined,
    description: undefined,
    icon: undefined,
    pic: 'city.avif',
    error: undefined,
  };


  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await api_url.json();
      console.log(data);


      const response_url = await fetch(`https://api.pexels.com/v1/search?query=${data.name+" city"}&per_page=1`, {
        headers: {
            Authorization: API_KEY_PEX,
        },
    });
    console.log(data.name+" city");

    const response = await response_url.json();
    let pic = 'city.avif';
     if (response.photos && response.photos.length > 0) {
      console.log("Изображение города:", response.photos[0].src.original);
       pic = response.photos[0].src.original
     }


      if (data.cod === "404") {
        this.setState({
          temp: undefined,
          feels_like: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunrise: undefined,
          sunset: undefined,
          wind: undefined,
          description: undefined,
          icon: undefined,
          pic: undefined,
          error: "Введено неправильное название",
        });
        return;
      }

      const sunsetInSec = data.sys.sunset;
      const date = new Date(sunsetInSec * 1000);
      const sunset_date = date.toLocaleTimeString();

      const sunriseInSec = data.sys.sunrise;
      const date2 = new Date(sunriseInSec * 1000);
      const sunrise_date = date2.toLocaleTimeString();

      const temp = data.main.temp;
      const tempC = Math.floor(temp - 273.15);


      const temp_f = data.main.feels_like;
      const tempC_f = Math.floor(temp_f - 273.15);


      this.setState({
        temp: tempC,
        feels_like: tempC_f,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: sunrise_date,
        sunset: sunset_date,
        wind: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        pic: pic,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        feels_like: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        wind: undefined,
        description: undefined,
        icon: undefined,
        pic: undefined,
        error: "Введите город",
      });
    }
  };

  render() {
    return (
      <div>
        <Info />
        <div className="container">
          <div className="left" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${this.state.pic})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
    }}
    >
            <Form weatherMethod={this.gettingWeather} />
          </div>
          <div className="right">
            <Weather
              temp={this.state.temp}
              feels_like={this.state.feels_like}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              wind={this.state.wind}
              description={this.state.description}
              icon={this.state.icon}
              error={this.state.error}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
