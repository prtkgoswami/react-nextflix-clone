import React, {useState, useEffect, useRef} from 'react';
import axios from './axios';
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerId, setTrailerId] = useState("");
    const rowRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const handleClick = (movie) => {
        if (trailerId)
            setTrailerId("");
        else {
            movieTrailer(movie?.name || "")
            .then ((url) => {
                console.log(movie.name + " " + url);
                const urlParam = new URLSearchParams(new URL(url).search);
                console.log(movie.name + " " + urlParam.get('v'));
                setTrailerId(urlParam.get('v'));
            })
            .catch((error) => console.log(error))
        }
    };

    const opts = {
        height: "400",
        width: "100%",
        playerVars: {autoplay: 1,},
    };

    const handleRowNav = (direction) => {
        console.log(rowRef.current.scrollWidth + " " + rowRef.current.outerWidth + " " + rowRef.current.scrollLeft);
        if (rowRef != null) {
            if (direction === "left") {
               rowRef.current.scrollLeft -= 1000;
            } else {
               rowRef.current.scrollLeft += 1000;
            }
        }
    }

    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>

            <button 
                className={`row-nav row-nav-left ${isLargeRow && "row-nav-lg"}`}
                onClick={() => handleRowNav("left")}
            >
                <span className="left-arrow"><FontAwesomeIcon icon={faChevronLeft}/></span>
            </button>
            <button 
                className={`row-nav row-nav-right ${isLargeRow && "row-nav-lg"}`}
                onClick={() => handleRowNav("right")}
            >
                <span className="right-arrow"><FontAwesomeIcon icon={faChevronRight}/></span>
            </button>
            <div className={`row-posters`} ref={rowRef}>
                {movies.map(movie => (
                   <img
                        key={movie.id}
                        className={`row-poster ${isLargeRow && "poster-Lg"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        width="100%"
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>

            {trailerId && <Youtube videoId={trailerId} opts={opts}/>}
        </div>
    )
}

export default Row
