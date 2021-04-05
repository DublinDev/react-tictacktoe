import React from "react";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h3>{this.props.message}</h3>;
  }
}
