import React from 'react';
import './App.css';

import Messages from './Components/Messages';
import Input from './Components/Input';

export default class App extends React.Component {
  randomName = () => {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", 
    "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", 
    "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", 
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", 
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", 
    "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", 
    "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", 
    "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", 
    "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", 
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", 
    "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", 
    "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", 
    "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", 
    "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", 
    "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }
  
  randomColor = () => {
    let colorArr = [
      '#0ce','#03a','#c0e','#74a','#058',
      '#e70','#0eb','#09c','#ea4','#ee3',
      '#bb9','#8e2','#b04','#098','#eb8',
      '#956','#078','#d18','#912','#740'
    ]
    return colorArr[Math.floor(Math.random() * colorArr.length)];
  }

  state = {
    messages: [],
    member: {
      username: this.randomName(),
      color: this.randomColor()
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("6Ff9zGbbNnztVntZ", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  onMessageSend = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  render() {
    return (
      <div className="main-body">
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onMessageSend={this.onMessageSend}
        />
      </div>
    );  
  }
}

