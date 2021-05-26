import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: ""
  }

  onSubmit(event){
    event.preventDefault();
    this.setState({text:""});
    this.props.onMessageSend(this.state.text);
  }

  onChange(event){
      this.setState({text: event.target.value});
  }

  render() {
    return (
      <div className="input">
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            onChange={event => this.onChange(event)}
            value={this.state.text}
            type="text"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;