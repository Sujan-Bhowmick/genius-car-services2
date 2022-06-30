import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import './Register.css'
import auth from '../../../firebase.init';
const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login')
    }

    if(user){
        navigate('/home')
    }

    const handleRegister = event => {
        event.preventDefault();
        // console.log(event.target.email.value)
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(email, password)
    }
    return (
        <div className='register-form'>
            <h2 style={{textAlign: "center"}}>Please Register</h2>
            <form onSubmit={handleRegister} >
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" id="" placeholder='Your Name' />
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="" placeholder='Email ' required />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" id="" placeholder='password' required />
                <input type="submit" value="Register"/>
            </form>
            <p>Allready have an account?<Link to={'/login'} className='text-danger text-decoration-none' onClick={navigateLogin}>  Please Login </Link></p>
        </div>
    );
};

export default Register;