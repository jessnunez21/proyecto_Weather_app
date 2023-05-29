import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import api from "./utilis/apiKeys";
import WeatherCart from "./components/WeatherCart";
import Loading from "./components/Loading";
import "./components/styles/weatherCart.css";
import WeatherCartError from "./components/WeatherCartError";

//pos = position
function App() {
  const [coords, setCoords] = useState(); //localotation
  const [error, setError] = useState(); // error del geolocalitation
  const [weather, setWeather] = useState(); // api clima
  const [temp, setTemp] = useState(); // corresponde al cambio de f/grados c.
 

  const [inputValueCountry, setInputValueCountry] = useState();

  const success = (pos) => {
    const obj = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
    setCoords(obj);
  };


  useEffect(() => {
    if (inputValueCountry ) {
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${inputValueCountry}&appid=${api()}&lang=${"es"}`;
      axios.get(url)
      .then((res) =>{
        setWeather(res.data);
      })
        .catch((error) => console.log(error));

    }
  }, [inputValueCountry])


  useEffect(() => {
    // cuando coords tenga informacion se va a efectuar la api clima
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${api()}&lang=${"es"}`;
      
      axios.get(url) // promesa
        .then((res) => {
          setWeather(res.data); //respuesta positiva
          const objTemp = {
            // la informacion por defecto esta en grados kelvin
            // en el celsius se busca la informacion de la bd. luego se trasnforma kelvin a celsius
            //en el farenheit se transfroma kelvin a farenheit por la formula
            celsius: +(res.data.main.temp - 273.15).toFixed(1),
            farenheit: +(((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(1),
          };
          setTemp(objTemp);
        })

        .catch((error) => console.log(error));
    } 
  }, [coords]);

  const errorCallback = (error) => {
    setError(`ERROR(${error.code}): ${error.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, errorCallback);
  }, []);

  return (
    <>
      {coords ? (
        <div className="container">
          {weather  ? (
           
            <WeatherCart
            
              weather={weather}
              temp={temp}
              setInputValueCountry={setInputValueCountry}
              
            />) 
            : 
            <Loading />}

        </div>
       
      ) : (
        <WeatherCartError error={error} />
      )}
    </>
  );
}

export default App;
