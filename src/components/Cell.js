import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellValues: new Array(8).fill(null),
    };
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </div>
    );
  }
}

export default Cell;
