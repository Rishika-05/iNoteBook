import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [credendials, setCredentials] = useState({ name:"", email: "", password: "" });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credendials;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name , email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save auth token & redirect
            localStorage.setItem('token', json.authtoken);
            history.push('/login');
            props.showAlert('Logged in succesfully!', 'success');
        } else {
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credendials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container m-auto" style={{ width: '450px' }}>
            <h3 className='my-3 mb-2' >Create an Account</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={ onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5}  required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
