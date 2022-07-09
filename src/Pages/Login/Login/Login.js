import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    let errorElement;

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true })
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message} </p>
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email, password);
        signInWithEmailAndPassword(email, password)
    }

    const NavigateRegister = event => {
        navigate('register')
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
       if(email){
        await sendPasswordResetEmail(email);
        toast('Sent email');
       }
       else{
        toast('please enter your email address')
       }
    }

    return (
        <div className=' mx-auto w-50'>
            <Form onSubmit={handleSubmit}>
                <h3 className='text-primary'>Please login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email"  required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password"  required/>
                </Form.Group>
                <Button variant="primary w-50 d-block mx-auto mb-2" type="submit">
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>New to Genius Car! <Link to='/register' className='text-decoration-none' onClick={NavigateRegister}>Please Register</Link></p>
            <p>Forget Password! <button  className=' btn btn-link text-decoration-none' onClick={resetPassword}>Reset Password</button></p>
            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;