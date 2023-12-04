import React, { useState } from 'react';
import axios from 'axios';

// Create signup component --> export and import to app
const SignUp = () => {
    // Setting userInputs
    const [signupInput, setSignupInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    // handle event
    const handleChanges = (e) => {
        // set input
        setSignupInput({
            // get all the inputs
            ...signupInput,
            [e.target.name]: e.target.value, // fix here, set the specific input value
        });
    };

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        try {
            const response = await axios.post('http://localhost:5001/api/users/signup', signupInput, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data); // Log the response
    
            // Clear form data after successful submission
            setSignupInput({ username: '', email: '', password: '' });
    
            // Additional handling...
        } catch (error) {
            console.error(error.response.data); // Log the error response
            // Additional error handling...
        }
    }

    return (
        // container for signup
        <div>
            <h2>SignUp New Users</h2>
            {/* Create Form For signup */}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={signupInput.username}
                        onChange={handleChanges}/>
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={signupInput.email}
                        onChange={handleChanges}/>
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={signupInput.password}
                        onChange={handleChanges}/>
                </label>
                {/*Submit Button */}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignUp;