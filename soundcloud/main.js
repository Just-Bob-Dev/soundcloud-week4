
//  Here is a guide for the steps you could take:
// 8538a1744a7fdaa59981232897501e04
// 095fe1dcd09eb3d0e1d3d89c76f5618f
// 1. First select and store the elements you'll be working with
var submitButton = document.getElementById("subButton");
var inputTrack = document.getElementById("musicSearch");
let markup;
// let searchItem = inputTrack.value;
// console.log(searchItem);
// 2. Create your `onSubmit` event for getting the user's search term

submitButton.addEventListener('click', function onSubmit(){
  console.log("Button clicked");
  console.log(inputTrack.value)
  let searchItem = inputTrack.value;
  searchAPI(searchItem);
});

inputTrack.addEventListener("keypress", function(e){
  let x = e.which || e.keycode;
  if(x === 13 && inputTrack.value != ""){
    console.log("you pressed enter");
    searchAPI(inputTrack.value);
  }
  return e;
});

// 3. Create your `fetch` request that is called after a submission

console.log("you're connected");

function searchAPI(userString){
  //Takes input and turns searchable string into a fetch call to api.
  console.log(userString);
  let clientId = '095fe1dcd09eb3d0e1d3d89c76f5618f'
   let apiCall = 'https://api.soundcloud.com/tracks/?client_id='+ clientId + '&q=' + userString+ "&limit=16";

   fetch(apiCall)
   .then
   (
      function(response) {
        if (response.status !== 200) {
          console.log("bad response: " + response.status);
          return;
        }
        response.json().then(function(data){
          console.log(data);
          let myTracks = data;

//4. Create a way to append the fetch results to your page

          function renderMyTrack()
          {
            return`<div class="track-container">
            ${myTracks.map(myTrack =>
            `
            <div class="track">
            <button class="track-button">
              <img src="${myTrack.artwork_url}" id="${myTrack.stream_url}/?client_id=${clientId}" alt="Artwork for track is supposed to be here.">
            </button>
            <ul>
              <li class="song-name">${myTrack.title}</li>
              <li class="user-name">${myTrack.user.username}</li>
            </ul>
            </div>
            `).join('')}
            </div>`;
          }
          markup = renderMyTrack();
          console.log(markup);
          document.getElementById('results').innerHTML = markup;

// 5. Create a way to listen for a click that will play the song in the audio play

      document.getElementById('results').addEventListener('click', function(event){
          let trackTrigger = document.getElementsByClassName("track-button");
          event.target = trackTrigger;
          let audio = document.getElementById("audio-wrapper");
          audio.innerHTML = `<audio class="music-player" controls="controls" src=${event.target.id} autoplay></audio>`;
          // console.log("You clicked " + event.target.id);
        });
        });
      }

    );
}
