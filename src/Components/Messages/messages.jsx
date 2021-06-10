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
		const classMessage = myMessage ? 'my-message' : 'user-message';
		const classText = myMessage ? 'my-text' : 'user-text'
		
		console.log(currentMember.id);
		return (
			<li className={classMessage}>
				<div class="message-container">
					<div className="message-username">
						{member.clientData.username}
					</div>
					<div className={classText} style={{backgroundColor: member.clientData.color}}>
						{text}
					</div>
				</div>
			</li>
		);
  }

}

export default Messages;