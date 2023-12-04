import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

const AppTabs = () => {
    const [curr, newTab] = useState('signup');
    //handle tabs ---> put tab in() not working without
    const handleTabChange = (tab) => {
        newTab(tab);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabChange('signup')}>SignUp</button>
                <button onClick={() => handleTabChange('login')}>Login</button>
                <button onClick={() => handleTabChange('home')}>Home</button>
            </div>
            {curr === 'signup' ? <SignUp /> : (curr === 'login' ? <Login /> : <Home />)}
        </div>
    );
};

export default AppTabs;