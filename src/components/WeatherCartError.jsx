

const WeatherCartError = ({error}) => {



  return (
    <div className="content__error">

        <h1 >{error}</h1>
       <div className="img__error">
        <img src="https://img.freepik.com/vector-gratis/ilustracion-satelite_53876-5601.jpg?w=740&t=st=1685281677~exp=1685282277~hmac=75b752cca15a8bfc4e86c38c449256453fe65554073568436429554a980b25d4" alt="Imagen de rawpixel.com</a> en Freepik" />
       </div>
      
    </div>
  )
}

export default WeatherCartError