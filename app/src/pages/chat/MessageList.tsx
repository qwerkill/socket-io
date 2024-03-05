import { useState, useEffect } from 'react';
import socket from '../../utils/socket';

const MessageList = ({currentRoom}:{currentRoom:string}) => {
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string, socketId: string, room: string }[]>([]);
    
    useEffect(() => {
        const newMessageHandler = (data: { text: string, socketId: string, room: string }) => {
            if (data.room === currentRoom) {
                setMessages((messages) => [...messages, data])
            }
        };

        socket.on('newMessage', newMessageHandler)

        return () => {
            socket.off('newMessage', newMessageHandler);
        };
    }, [currentRoom]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('message', { text: newMessage, socketId: socket.id, room: currentRoom });
        console.log(newMessage,'newMessage');
        setNewMessage('')
    }         

    console.log(messages,'messages');
    console.log(currentRoom,'currentRoom');

    return ( 
        <div className="message-list-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <li key={index} className={message.socketId === socket.id ? 'currentUser' : 'otherUser'}>
                        {message.text}
                    </li>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="message-form">
                <input type="text" value={newMessage} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
 
export default MessageList;