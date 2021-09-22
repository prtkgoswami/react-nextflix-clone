import React from 'react';
import './App.css';
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import requests from './requests';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Nav/>

      <Banner/>

      <Row title="Only on Netflix" fetchURL={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchURL={requests.fetchTrending}/>
      <Row title="Top Rated"  fetchURL={requests.fetchTopRated}/>
      <Row title="Action Movies"  fetchURL={requests.fetchActionMovies}/>
      <Row title="Comedy Movies"  fetchURL={requests.fetchComedyMovies}/>
      <Row title="Horror Movies"  fetchURL={requests.fetchHorrorMovies}/>
      <Row title="Romance Movies"  fetchURL={requests.fetchRomanceMovies}/>
      <Row title="Documentaries"  fetchURL={requests.fetchDocumentaries}/>

      <footer>
        <p class="alert">This is only a learning project and is not intended for commercial purposes.</p>
        <p>
          This project has been developed using React.js, HTML, CSS, Firebase.<br/>
          Thanks to <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> for their Awesome Icons &amp; <a href="https://www.netflix.com" target="_blank">Netflix</a> for the inspiration.
        </p>
        <p>If you like my work, don't forget to check out my <a href="http://prtkgoswami.github.io" target="_blank">Website</a>.</p>
      </footer>
    </div>
  );
}

export default App;
