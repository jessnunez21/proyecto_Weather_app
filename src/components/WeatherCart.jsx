import React, { useState } from 'react'



// se crea el useState isCelsius porque queremos que cambie con la interaccion del usuario de f/c


const WeatherCart = ({weather, temp, setInputValueCountry}) => {
    const [isCelsius, setIsCelsius] = useState(true);

    const handleClickTemp = ()=>{
        setIsCelsius(!isCelsius)
        
       
    }
// el evento submit hace que se recargue la pagina
    const handleSubmit = e => {
        e.preventDefault();

        setInputValueCountry(e.target.inputValueCountry.value.trim());
        
    }

    
    
  return (
    <>
   
      
        <div className="content__input">
        <form onSubmit={handleSubmit} className='content__form'>
             <input type="text" id='inputValueCountry' className='input' placeholder='country, city'/>
             
             <button className='form__btn'>Search</button>
        </form>
        </div>

            <article className='container__weather'>
            <header className='weather__header'>
                <h1 className='weather__title'>Weather App</h1>
    
                
                <h2 className='weather__subtitle'>{weather?.name}, {weather?.sys.country}</h2>
             </header>
            
            <section className='weather__body' id='modal'>
                <div className='img__weather'>
                     <img src={weather ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png` : ""} alt="img_Clima" />
                </div>
                
                <div className='weather__info'>
                    <h3 className='weather__info-title'>"{weather?.weather[0].description}"</h3>
                   <div className="info">
                   <ul className='weather__list'>
                        <li className='weather__items'><span className='weather_name_title'>Wind Speed</span>
                        <span className='weather__list'>{weather?.wind.speed}m/s</span></li>
                        <li className='weather__items'><span className='weather_name_title'>Clouds</span> <span className='weather__list'>{weather?.clouds.all}%</span> </li>
                        <li className='weather__items'><span className='weather_name_title'>Pressure</span> <span className='weather__list'>{weather?.main.pressure}hPa</span></li>
                    </ul>
                   </div>
                </div>
            </section>
    
            <footer className='weather__footer'>
            <h2 className='weather__temp'>{ isCelsius ? `${temp?.celsius} ºC` : `${temp?.farenheit} ºF`} {}</h2>
                <button className='weather__btn' onClick={handleClickTemp} >Change to {isCelsius ? `ºF` : `ºC`}</button>
            </footer>
    
        </article>
        
   
    </>
  )
 
}

export default WeatherCart