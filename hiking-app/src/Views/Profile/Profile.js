import { React} from 'react';
import { useAuth } from "../../Context/AuthContext"

const Profile = () => {
 const { user }  = useAuth();

    return (
        <div className='profile'>
            <div className='profile-info'>
                <p>Name: {user.firstName}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
}

export default Profile;
