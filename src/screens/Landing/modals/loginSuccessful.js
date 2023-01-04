import React from 'react';

const LoginSuccessful = () => (
    <div className="form">
        <div className="text-center">
            <img className="success-icon" alt="Success" src="/assets/images/success.svg" />
        </div>
        <p className="header upper-case text-h1">Welcome! You are logged in.</p>
        {/* <p className="text-f5">Check your email to validate it and secure your spot on the waitlist.</p> */}
    </div>
);

export default LoginSuccessful;
