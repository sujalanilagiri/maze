import React, { Component } from "react";
import { Maze } from "./Maze";
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      mazeData: null
    };
    //this.solvemaze = this.solvemaze.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
  }
  _onButtonClick() {
    console.log(document.getElementById("mazecontent").value);
    this.setState({
      showComponent: true,
      mazeData: document.getElementById("mazecontent").value
    });
  }
  render() {
    return (
      <div className="div">
        Enter the maze
        <textarea id="mazecontent" rows="10" cols="40" className="t1" />
        <br />
        <br />
        <input
          type="button"
          className="button"
          value="Click"
          onClick={this._onButtonClick}
        />
        {this.state.showComponent ? (
          <Maze mazeData={this.state.mazeData} />
        ) : null}
      </div>
    );
  }
}
export default Main;
