import React from "react";
import "./form.css"

const Form = (props) => (
    <form onSubmit={props.weatherMethod}>
        <p>Введи город:</p>
        <input type="text" name="city" placeholder="Город" />
        <button> Узнать погоду ➔</button>
    </form>
)
export default Form;
