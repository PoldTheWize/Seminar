import {Component} from "react";
import React from "react";

class Messages extends Component {
	render() {
	  const {messages} = this.props;
	  return (
		<ul className="messages-list">
		  {messages.map(m => this.renderMessage(m))}
		</ul>
	  );
	}
	
	renderMessage(message) {
		const {member, text} = message;
		const {currentMember} = this.props;
		const myMessage = member.id === currentMember.id;
		const className = myMessage ? 'my-message' : 'user-message';
		
		console.log(currentMember.id);
		return (
			<li className={className}>
				<div className="message-color" >
					<div className="message-username">
						{member.clientData.username}
					</div>
					<div className="message-text" style={{backgroundColor: member.clientData.color}}>
						{text}
					</div>
				</div>
			</li>
		);
  }

}

export default Messages;