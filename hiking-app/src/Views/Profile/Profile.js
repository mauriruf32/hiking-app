import { React} from 'react';
import { useAuth } from "../../Context/AuthContext"

const Profile = () => {
 const { user }  = useAuth();

    return (
        <div className='profile'>
            <div className='profile-info'>
                <p>Name: {user.firstName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phoneNumber}</p>
            </div>
        </div>
    );
}

export default Profile;

// import axios from 'axios';
// import { React, useEffect, useState } from 'react';


// const Profile = () => {
//     const [user, setUser] = useState({});
//     const [isUserUpdated, setIsUserUpdated] = useState(false);

   

//     useEffect(() =>{
//         const getProfileData = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:3001/users`);
//                 setUser(data);
//                 setIsUserUpdated(false);
//             } catch (error) {
//                 console.log({ error });
//             }
//         };
//         getProfileData();
//     }, [isUserUpdated]);
//     console.log({user});

//   return (
//     <div className='profile'>
//     <div className='profile-info'>
//         <p>Name: {user.firstName}</p>
//         <p>Email: {user.email}</p>
//         <p>Phone: {user.phoneNumber}</p>
//     </div>
//     </div>
//   )
// }

// export default Profile;