import React from 'react';
import './SignUpPage.css';

function SignUpPage() {
    return (
        <div className="signup-page">
            <h2>Welcome!</h2>
            <p>Do you already have an account?</p>
            <div className="button-group">
                <button className="button" onClick={() => alert("Redirect to Log In")}>
                    Log In
                </button>
                <button className="button" onClick={() => alert("Redirect to Sign Up Form")}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;