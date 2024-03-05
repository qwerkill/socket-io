import  { useState } from 'react';
import socket from '../../utils/socket';

const RoomCreate = () => {
    const [roomName, setRoomName] = useState('');

    const createRoom = () => {
        socket.emit('createRoom', roomName);
        setRoomName('');
    };

    return (
        <div>
            <input 
                type="text" 
                value={roomName} 
                onChange={(e) => setRoomName(e.target.value)} 
                placeholder="Enter room name" 
            />
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
};

export default RoomCreate;