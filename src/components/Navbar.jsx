import React from 'react';
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
const {person}=AuthContext()    
console.log(person)
    return (
        <div>
            
        </div>
    );
};

export default Navbar;