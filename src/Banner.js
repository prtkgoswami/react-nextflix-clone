import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests';
import "./Banner.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(()  => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const randIndex = Math.floor(Math.random() * request.data.results.length - 1);
            setMovie(request.data.results[randIndex]);
        }

        fetchData();
    }, []);

    // console.log(movie);

    function truncate(str, len) {
        return str?.length > len ? str.substr(0, len - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
            }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>

                {/* Desc */}
                <p className="banner-desc">{truncate(movie?.overview, 150)}</p>

                {/* div > 2 Buttons (Play, My List) */}
                <div className="banner-btn-group">
                    <button className="banner-btn play-btn"><FontAwesomeIcon icon={faPlay}/> Play</button>
                    <button className="banner-btn info-btn"><FontAwesomeIcon icon={faInfoCircle}/> More Info</button>
                </div>
            </div>

            <div className="banner-fadebottom"></div>
        </header>
    )
}

export default Banner
