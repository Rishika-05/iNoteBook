import React, {useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'


const Navbar = () => {
    let loc = useLocation();
    let history = useHistory();
    useEffect(() => {
        // console.log(loc.pathname);
    }, [loc]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${loc.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${loc.pathname === '/about'?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className="d-flex">
                                {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
                                <a class="btn btn-primary mx-2 ms-4" href="/login" role="button">Sign In</a>
                                <a class="btn btn-primary mx-1" href="/signup" role="button">Sign Up</a>
                            </form> :
                            <button className='btn btn-primary ms-4' onClick={handleLogout} >Logout</button>
                            }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
