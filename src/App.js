import React from "react";
import "./App.css";
import Tab from "./Tab";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      picArr: [
        "./image/1.jpeg",
        "./image/2.jpeg",
        "./image/3.jpeg",
        "./image/4.jpeg"
      ]
    };
  }
  render() {
    return (
      <div>
        <Tab
          json={{
            picArr: this.state.picArr,
            timer: 2000,
            width: 640,
            height: 360
          }}
        />
      </div>
    );
  }
}
