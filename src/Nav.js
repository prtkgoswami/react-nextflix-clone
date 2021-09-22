import React, { useState, useEffect } from 'react'
import "./Nav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBell, faTimes } from '@fortawesome/free-solid-svg-icons'
import requests from './requests'
import axios from './axios'

const base_url = "https://image.tmdb.org/t/p/original/";
function Nav() {
    const [latest, setLatest] = useState([]);
    const [solidNav, handleNav] = useState(false);
    const [notify, setNotificationToggle] = useState(false);
    const [notifyHover, setNotificationHover] = useState(false);
    const [showAvatar, setAvatarToggle] = useState(false);
    const [avatarHover, setAvatarnHover] = useState(false);
    const [showSearchCancel, setSearchCancel] = useState(false);
    const [showSearch, setSearchToggle] = useState(false);

    useEffect(()  => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            console.log(request)
            setLatest(request.data.results);
            return request;
        }

        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100)
                handleNav(true);
            else
                handleNav(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);

    const toggleSearch = () => {
        setSearchToggle(!showSearch);
        const searchInput = document.getElementById("searchInput");
        const searchBox = document.getElementById("search-box");
        
    };

    const eraseSearch = () => {
        const searchInput = document.getElementById("searchInput");
        searchInput.value = "";
        setSearchCancel(false);
    };

    return (
        <nav className={`nav ${solidNav && "nav-dark"}`}>
            <div className="menu">
                <img
                    className="nav-logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
                    alt="Netflix Logo"
                />
                {/* <div className="min-menu">
                    <p>Browse</p>
                    <div className="min-menu-down-arrow"></div>
                </div> */}
                <a href=""><p>Home</p></a>
                <a href=""><p>TV Shows</p></a>
                <a href=""><p>Movies</p></a>
                <a href=""><p>News &amp; Popular</p></a>
                <a href=""><p>My List</p></a>
                <a href=""><p>Rewatch</p></a>
            </div>
            <div className="extra-menu">
                <div id="search-box" className={`searchbox ${showSearch && "active"}`}>
                    <button className="search" onClick={toggleSearch}>
                        <p><FontAwesomeIcon icon={faSearch}/></p>
                    </button>
                    { showSearch && 
                        <input 
                            type="text" 
                            id="searchInput"
                            name="searchQuery" 
                            placeholder="Titles, people, genres" 
                            onChange={(event) => {
                                if (event.target.value != "")
                                setSearchCancel(true);
                            }}
                        />
                    }
                    { showSearchCancel && 
                        <button className="cancel-search" onClick={eraseSearch}>
                            <p><FontAwesomeIcon icon={faTimes}/></p>
                        </button>
                    }
                </div>
                <button 
                    className="notification" 
                    onClick={() => setNotificationToggle(!notify)}
                    onMouseEnter={() => setNotificationHover(true)}
                    onMouseLeave={() => setNotificationHover(false)}
                >
                    <p><FontAwesomeIcon icon={faBell}/></p>
                </button>
                <button 
                    className="avatar-btn" 
                    onClick={() => setAvatarToggle(!showAvatar)}
                    onMouseEnter={() => setAvatarnHover(true)}
                    onMouseLeave={() => setAvatarnHover(false)}
                >
                    <img
                        className="nav-avatar"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Avatar"
                    />
                    <span className="down-arrow"></span>
                </button>
            </div>

            { (notify || notifyHover) && 
                <div id="notification-dropdown" className="notification-container">
                    <div className="arrow-up"></div>
                    <div className="movie-container">
                        {latest.map(movie => (
                            <div className="notification-item" key={movie.id}>
                                <img src={`${base_url}${movie.backdrop_path}`} alt="" className="notify-movie-poster" />
                                <div className="notify-movie-details">
                                    <p>New Arrival</p>
                                    <p>{movie.name || movie.original_title}</p>
                                    <p>{movie.first_air_date || movie.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            }

            { (showAvatar || avatarHover) &&
                <div id="profile-dropdown" className="avatar-container">
                    <div className="arrow-up"></div>
                    <div className="profile-container">
                        <div>
                            <p>Manage Profiles</p>
                        </div>
                        <div>
                            <p>Account</p>
                            <p>Help Centre</p>
                            <p>Sign out of Netflix</p>
                        </div>
                    </div>
                </div> 
            }

                {/* <div id="menu-dropdown" className="min-menu-container">
                    <div className="arrow-up"></div>
                    <div className="menu-container">
                        <div><p>Home</p></div>
                        <div><p>TV Shows</p></div>
                        <div><p>Movies</p></div>
                        <div><p>News &amp; Popular</p></div>
                        <div><p>My List</p></div>
                        <div><p>Rewatch</p></div>
                    </div>
                </div>  */}
        </nav>
    )
}

export default Nav
