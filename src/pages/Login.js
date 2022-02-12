import React from "react";
import {SignInButton, SignOutButton} from "../components/users";

function Login({ user, UEmail, setUEmail, UName, setUName, setUid}) {

    return (
        <div>
            { user ? null : <p className = "login-header">Login to unlock the outdoors!</p> }
            { user ? <SignOutButton setUEmail={setUEmail} setUName={setUName} setUid={setUid}/> :
                      <SignInButton setUEmail={setUEmail} setUName={setUName} /> }
            <div className="container">
                <div className="row">      
                    <div className="col-sm-6">
                        {user? <div>Your Name: {UName ? UName : "NULL"}</div> : null}
                        {user? <div>Your email: {UEmail ? UEmail : "NULL"}</div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;