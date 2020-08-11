import React, { Component } from 'react';



    class ChatMessage extends Component {
        constructor(props) {
            super(props);
            this.changeView = this.changeView.bind(this);
        }
        changeView() {
            this.props.changeView('chatApp')
        }
        render() {
            return (
                <div>
                    <button className="chat-button" onClick={this.changeView}>문의 하기</button>
                </div>
            )
        }
    }
    export default ChatMessage;