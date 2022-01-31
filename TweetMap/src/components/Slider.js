import React, { useState } from "react";

function Tweet(tweet) {
  console.log(tweet);
  return (
    <div class="tweet-wrap">
      <div class="tweet-header">
        <div class="tweet-header-info">
          {tweet.tweet.name} <span>@{tweet.tweet.username}</span>
          <span>. {tweet.tweet.datestamp}</span>
          <p>{tweet.tweet.tweet}</p>
        </div>
      </div>
    </div>
  );
}

export default function Slider(props) {

  function handleClick(city) {
    const url = "http://localhost:9000/tweets/";
    fetch(url.concat(city.name).concat('?topic=').concat(props.searchTopic).concat('&limit=').concat(city.count))
      .then(res => res.json())
      .then(result => props.setTweetsResult(result.tweets));
  }

  return (
    <div id="slider">
      <h4 id="titreTweets">Vous pouvez voir toutes les tweets :</h4>
      {props.selectedCity
        ? props.tweetsResult
          ? props.tweetsResult.map(tweet => <Tweet tweet={tweet} />)
          : <button
              id="tweetsButton"
              onClick={() => handleClick(props.selectedCity)}
            >
              Voir les tweets dans {props.selectedCity.name}
            </button>
        : <p id="villeMsg">Veuillez chercher un sujet et selectionner une ville !</p>}
    </div>
  );
}
