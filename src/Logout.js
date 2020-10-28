import React, {  useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
function Logout(props) {
    // let history = useHistory();
    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('login');
        localStorage.removeItem('jwtToken');
        alert(`Logout the system`);
        window.location.href="/";
        //window.location.reload();
       // history.push("/login");
        
    }, []);
    return (
        <div>
            <h2>Logout the system...</h2>
        </div>
    );
}

export default Logout;