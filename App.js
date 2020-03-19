import React, { Component } from "react";
import axios from "axios";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      year: "",
      data: [],
      error: ""
    };
  }

  onchange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };
  onclick = () => {
    if (this.state.movie !== "" && this.state.year !== "") {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=5df443e0&t=${this.state.movie}&y=${this.state.year}`
        )
        .then(Response => {
          this.setState({
            data: Response.data,
            error: "",
            movie: "",
            year: ""
          });
          localStorage.setItem("history", this.state.data.Title);
        })
        .catch(err => {
          if (err) throw err;
        });
    } else {
      this.setState({
        error: "Fill all fields"
      });
    }
  };
  render() {
    const { movie, year, error, data } = this.state;
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 p-2 md:mt-10 mt-5" />
        <div className=""></div>
        <div className="p-2" />
        <div
          id="bg1"
          className="w-full p-2 rounded-md text-center text-white font-hairline"
        >
          Search Your Movie
        </div>
        <div className="flex">
          <label
            id="bg2"
            className="p-2 mt-2 flex-auto text-center rounded-md mr-1 text-white font-extrabold"
          >
            Movie Title :{" "}
          </label>
          <input
            type="text"
            name="movie"
            value={movie}
            onChange={this.onchange}
          />
        </div>
        <br />
         <label
            id="bg2"
            className="p-2 mt-2 flex-auto text-center rounded-md mr-1 text-white font-extrabold"
          >
            Movie year :{" "}
          </label>
        <input type="text"
         name="year" 
         value={year}
          onChange={this.onchange}
           />
        <br />
        <button onClick={this.onclick}>Search</button>
        <br /> <br />
        {error}
        <br />
        {data.Title}
        <br />
        <img src={data.Poster} alt={data.Title} />
      </div>
    );
  }
}
