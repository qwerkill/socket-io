import { useEffect, useState } from "react";
import socket from "../../utils/socket";

interface User {
    socketId: string,
    user: {
        id: string,
        username: string,
    }
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([])
 
    useEffect(() => {
        socket.on('users', (data) => {
            console.log(data)
            setUsers(data)
        })
    }, [])

    console.log(users, "users");
    


    return ( 
        <div className="user-list">
        UserList
            <ul>
                {users.filter(user => user.socketId !== socket.id).map((user) => (
                    <li key={user.socketId}>{user.user.username}</li>
                ))}
            </ul>
        </div>
     );
}
 
export default UserList;