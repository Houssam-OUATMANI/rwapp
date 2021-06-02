import React, { useState, useRef } from "react"
import "./form.css"
import coldImg from "../assets/cold.gif"
import warmImg from "../assets/warm.gif"

export default function Form() {
	const [weather, setWeather] = useState(undefined)
	const [activeBtn, setActiveBtn] = useState("")
	const inputRef = useRef()
	const btnRef = useRef()
   
	async function letTheMagieHappen(e) {
		e.preventDefault()
		const inputValue = inputRef.current.value
		const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=200b01d1422a0be035b2231349dd26ae`
		const response = await fetch(URL)
		const data = await response.json()
		if(response.ok){
			setWeather(data)
		}
		else {
			alert('Unknown City :(')
		}
		inputRef.current.value = ""
	}

	console.log(weather)
	if (!weather) {
		return (
			<form onSubmit={letTheMagieHappen}>
				<div className="form-group">
					<label htmlFor="city">Enter a City</label>
					<input  onChange={(e) => setActiveBtn(e.target.value)} type="text" placeholder="Bejaia" ref={inputRef} />
				</div>
				<button disabled={!activeBtn} ref={btnRef} type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		)
	} else {
		return (
			<div>
				<form onSubmit={letTheMagieHappen}>
					<div className="form-group">
						<label htmlFor="city">Enter a City</label>
						<input onChange={(e) => setActiveBtn(e.target.value)} type="text" placeholder="Bejaia" ref={inputRef} />
					</div>
					<button disabled={!activeBtn} type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>

				<section className="display1">
					<h2>Weather For {weather.name}</h2>
					<div className="display">
						<article>
							<p>
								Temperature : <span>{Math.round(weather.main.temp)}</span>{" "}
								celsius
							</p>
							<p>
								Minimal temp : <span>{Math.round(weather.main.temp_min)}</span>{" "}
								celsius{" "}
							</p>
							<p>
								Maximal temp : <span>{Math.round(weather.main.temp_max)}</span>{" "}
								celsius{" "}
							</p>
							<p>
								feel temp : <span>{Math.round(weather.main.feels_like)}</span>{" "}
								celsius{" "}
							</p>
							<p>
								Humidity : <span>{weather.main.humidity}</span> %{" "}
							</p>
						</article>
						<div className="images">
							<img src={weather.main.temp > 12 ? warmImg : coldImg} alt="" />
						</div>
					</div>
				</section>
			</div>
		)
	}
}
