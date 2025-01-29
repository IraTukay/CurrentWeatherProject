import React from "react";
import "./weather.css"
const Weather = (props) => {
    return (
        <div>
            {props.city
                &&
                <div className="sections" >
                    <div className="long-section">
                        <div className="place">
                            <div className="title">
                                Местоположение
                            </div>
                            {props.city}, {props.country}
                        </div>
                        <div className="place-discr">
                            <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt="Weather Icon" />
                            <div className="discr">
                            {props.description}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                            <div className="title">
                                Температура:
                            </div>
                            {props.temp}°С
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                            <div className="title">
                                Ощущается как:
                            </div>
                            {props.feels_like}°С
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                        <img src={`press.png`} alt="Weather Icon" className="small_img"/>
                            <div className="title">
                            
                                Давление:
                            </div>
                            {props.pressure} гПа
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                        <img src={`sun.png`} alt="Weather Icon" className="small_img"/>
                            <div className="title">
                                Восход солнца:
                            </div>
                            {props.sunrise}
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                        <img src={`sunrise.png`} alt="Weather Icon" className="small_img"/>
                            <div className="title">
                                Заход солнца:
                            </div>
                            {props.sunset}
                        </div>
                    </div>
                    <div className="section">
                        <div className="place">
                        <img src={`wind.png`} alt="Weather Icon" className="small_img"/>
                            <div className="title">
                                Скорость ветра:
                            </div>
                            {props.wind} м/с
                        </div>
                    </div>


                    <div className="footer">
                    <p> Поканы результаты по запросу "{props.city}, {props.country}"</p>
                    <p> Спасибо, что используете наше приложене!</p>
                    </div>
                </div>
            }
            {props.error &&
            <div className="erorr_mess">
            <h2>{props.error}!</h2>
            <h2>Попробуйте еще раз.</h2>
            </div>
            }
            

        </div>
    )

}


export default Weather;
