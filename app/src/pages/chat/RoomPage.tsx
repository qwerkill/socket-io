import { useEffect, useState } from 'react';
import socket from '../../utils/socket';
import MessageList from './MessageList';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';

const RoomPage = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string >('');
    const [newRoomName, setNewRoomName] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const newRoomHandler = (room:any) => {
            setRooms((rooms) => [...rooms, room]);
        };

        socket.on('newRoom', newRoomHandler);

        return () => {
            socket.off('newRoom', newRoomHandler);
        };
    }, []);
      
      const joinRoom = (room: string) => {
        socket.emit('joinRoom', room);
        setCurrentRoom(room);
        navigate(`/room/${room}`);
      };
      

  

    const createRoom = (event: React.FormEvent) => {
        event.preventDefault();
        socket.emit('createRoom', newRoomName);
        setNewRoomName('');
    };

    const handleChange = (value: string) => {
        setNewRoomName(value);
    };

    console.log('newRoomName', newRoomName);
    console.log('currentRoom', currentRoom);

    console.log(rooms);

    return (
        <div>
            <div className="room-name">
                    {rooms.map((room, index) => (
            <button key={index} onClick={() => joinRoom(room)}>
                Join {room}
            </button>
            ))}
            </div>
            <form onSubmit={createRoom} className="create-room-form">
                <input 
                    type="text" 
                    value={newRoomName} 
                    onChange={(e)=> handleChange(e.target.value)} 
                    placeholder="New room name" 
                />
                <button type="submit">Create Room</button>
            </form>
             <MessageList currentRoom={currentRoom}/>
            <UserList />
        </div>
    );
};

export default RoomPage;