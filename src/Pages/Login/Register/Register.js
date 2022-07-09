import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateErrror] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login')
    }

    if(loading || updating){
        return <Loading></Loading>
    }

    if (user) {
        console.log('user', user)
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;
       
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
          console.log('Updated profile');
          navigate('/home')
    }

    return (
        <div className='register-form'>
            <h2 style={{ textAlign: "center" }}>Please Register</h2>
            <form onSubmit={handleRegister} >
                <label htmlFor="Name">Name</label>
                <input type="text" name="name" id="" placeholder='Your Name' />
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="" placeholder='Email' required />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" id="" placeholder='password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                {/* <label className={agree ? 'ps-2':'ps-2 text-danger'} htmlFor="terms"> Accepts Terms and Condition</label> */}
                <label className={`ps-2 ${agree ? '' : 'text-danger'}`} htmlFor="terms"> Accepts Terms and Condition</label>
                <input
                 disabled = {!agree}
                    className='w-50 btn btn-primary mx-auto mt-2'
                    type="submit"
                    value="Register" />
            </form>
            <p>Allready have an account?<Link to='/login' className='text-primary text-decoration-none' onClick={navigateLogin}> Please Login </Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;