import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import BVideo from "./assets/weather_vid.mp4";
import Input from "./components/Input";
import Moment from 'moment';



function App() {
  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState("");
  const [dataFetched, setDataFetched] = useState(false);


  const fechData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const data = await res.data;
  
      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
  
      setDataFetched(true);
    } catch (error) {
      console.log(error)
      alert("Please, enter a Valid Location ")
    }

    
  };

  const defaultDataFetched = async () => {
if(!dataFetched){

  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
    const data = await res.data;

    setDegrees(data.main.temp);
    setLocation(data.name);
    setDescription(data.weather[0].description);
    setIcon(data.weather[0].icon);
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setCountry(data.sys.country);

}

  };

  useEffect(() => {
    defaultDataFetched()
  }, []);

  return (
    <div className="App">
      <div className="overlay"></div>
      <video className="video-container" src={BVideo} autoPlay loop muted />
      <div className="weather">
        <Input text={(e) => setUserLocation(e.target.value)} submit={fechData} cli={fechData} />

        <div className="weather-display">
          <h3 className="weather-location"> Weather in {location}</h3>

          <div>
            <h1 className="weather-degrees">{Math.round(degrees)}°C</h1>
          </div>

          <div className="weather-description">
            <div>
              <div className="weather-description-head">
                <span className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/w/${icon}.png`}
                    alt="weather icon"
                  />
                </span>
                <h3>{description}</h3>
              </div>

              <h3>Humidity: {humidity} %</h3>
              <h3>Wind Speed: {wind} m/s</h3>
            </div>

            <div className="weather-country">
              <h3>{country}</h3>
              <h2 className="weather-date">{Moment().format("dddd MMM YYYY")}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
