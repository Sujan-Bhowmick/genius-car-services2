import React from 'react';
import google2 from '../../../images/social/google2.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;

    // if(loading || loading1){
    //     return <Loading></Loading>
    // }
    
    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }

    if (user || user1) {
        navigate('/home')
    }

    return (
        <div>
            <div className='d-flex align-items-center '>
                <div style={{ height: '1px' }} className='bg-primary w-50'> </div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'> </div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img style={{ height: '20px' }} src={google2} alt="" />
                    <span className='px-1'> Google Sign In</span>
                </button>
                <button
                    className='btn btn-info w-50 d-block mx-auto my-2'>
                    <img style={{ height: '20px' }} src={facebook} alt="" />
                    <span className='px-1'> Facebook Sign In</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-info w-50 d-block mx-auto'>
                    <img style={{ height: '20px' }} src={github} alt="" />
                    <span className='px-1'> Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;