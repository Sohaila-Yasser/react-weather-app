import "./styles.css";
import React from "react";

const key = "fcc8de7015bbb202209bbf0261babf4c";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      city: "",
      weatherIcon: "",
      mainTemp: "",
      description: "",
      minTemp: "",
      maxTemp: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit() {
    if (this.state.inputValue === "") {
      alert("Please enter a country / city name!");
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${key}&units=metric`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            city: data.name,
            weatherIcon:
              "https://openweathermap.org/img/w/" +
              data.weather[0].icon +
              ".png",
            mainTemp: data.weather[0].main,
            description: data.weather[0].description,
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max
          });
        })

        .catch((error) => {
          console.log(error);
          alert("this location is not found");
        });
    }
  }

  render() {
    return (
      <div id="all">
        <div id="head">
          <input
            onChange={this.handleChange}
            value={this.state.inputValue}
            id="cityName"
            type="search"
            placeholder="Enter your city name"
          />
          <button onClick={this.handleSubmit} id="button">
            <i className="fa fa-search"></i>
          </button>
          <h1 id="one">{this.state.city}</h1>
          <img src={this.state.weatherIcon} id="two" />
        </div>
        <div id="details">
          <p id="three">{this.state.mainTemp}</p>
          <p id="four">{this.state.maxTemp}</p>
          <p id="five">{this.state.minTemp}</p>
          <p id="six">{this.state.description}</p>
        </div>
      </div>
    );
  }
}
