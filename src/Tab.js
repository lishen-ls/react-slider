import React from "react";
import "./Tab.css";

export default class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      picArr: [],
      timer: 5000,
      width: 1280,
      height: 720,
      index: 0,
      w: 0,
      tr: 0
    };
  }
  componentWillMount() {
    let { picArr, timer, width, height } = this.props.json;
    this.setState({
      picArr: picArr ? picArr : [],
      timer: timer ? timer : 5000,
      width: width ? width : 1280,
      height: height ? height : 720
    });
  }
  componentDidMount() {
    this.autoChange();
  }
  autoChange() {
    this.timeOut = setTimeout(() => {
      this.setState({
        tr: this.state.timer,
        w: 100
      });
    }, 0);
    this.interval = setInterval(() => {
      clearTimeout(this.timeOut);
      this.change(1);
      this.setState({
        tr: 0,
        w: 0
      });
      this.timeOut = setTimeout(() => {
        this.setState({
          tr: this.state.timer,
          w: 100
        });
      }, 10);
    }, this.state.timer);
  }
  cancelAutoChange() {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
    this.setState({
      w: 0,
      tr: 0
    });
  }
  change(e) {
    let { index, picArr } = this.state;
    if (e === -1 && index === 0) {
      this.setState({
        index: picArr.length - 1
      });
    } else if (e === 1 && index === picArr.length - 1) {
      this.setState({
        index: 0
      });
    } else {
      this.setState({
        index: index + e
      });
    }
  }
  render() {
    return (
      <div
        onMouseEnter={() => this.cancelAutoChange()}
        onMouseLeave={() => this.autoChange()}
        className="outbox"
        style={{ width: this.state.width, height: this.state.height }}
      >
        <div
          className="bar"
          style={{
            width: this.state.w + "%",
            transition: this.state.tr + "ms linear"
          }}
        />
        <ul
          className="inbox"
          style={{
            width: this.state.width * this.state.picArr.length,
            left: -this.state.width * this.state.index + "px"
          }}
        >
          {this.state.picArr.map((item, i) => {
            return (
              <li key={i} className="item">
                <img
                  style={{
                    width: this.state.width,
                    height: this.state.height
                  }}
                  src={item}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
        <span onClick={() => this.change(-1)} className="page-btn left" />
        <span onClick={() => this.change(1)} className="page-btn right" />
        <ul className="point-group">
          {this.state.picArr.map((item, i) => {
            return (
              <li
                key={i}
                className={i === this.state.index ? "point active" : "point"}
                onMouseEnter={() => this.setState({ index: i })}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
