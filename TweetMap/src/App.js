import React, { useState } from "react";
import "./stylesheet.css";
import Map from "./components/Map";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Search from "./components/Search";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [tweetsResult, setTweetsResult] = useState(null);
  const [searchTopic, setSearchTopic]   = useState(null);

  return (
    <div>
      <Header />
      <div id="container">
        <div id="mapContainer">
          <Search setSearchTopic={setSearchTopic} setSearchResult={setSearchResult} setSelectedCity={setSelectedCity} />
          <div id="mapClipPath">
            <Map
              searchResult={searchResult}
              selectedProperty={selectedCity}
              setTweetsResult={setTweetsResult}
              setSelectedProperty={setSelectedCity}
            />
          </div>
        </div>
        <Slider searchTopic={searchTopic} selectedCity={selectedCity} tweetsResult={tweetsResult} setTweetsResult={setTweetsResult} />
      </div>
    </div>
  );
}

export default App;
