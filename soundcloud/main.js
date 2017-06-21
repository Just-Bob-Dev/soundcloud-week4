
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

inputTrack.addEventListener('keypress', function(e){
  let x = e.which || e.keycode;
  if(e.keycode === 13 && inputTrack.value != "" && inputTrack.value){

    console.log(inputTrack.value);
    searchAPI(inputTrack.value);
  }
  else {
    return "Hey you need to put something in the input area.";
  }
});

// 3. Create your `fetch` request that is called after a submission

console.log("you're connected");

function searchAPI(userString){
  //Takes input and turns searchable string into a fetch call to api.
  console.log(userString);
  let clientId = '095fe1dcd09eb3d0e1d3d89c76f5618f&q'
   let apiCall = 'https://api.soundcloud.com/tracks/?client_id='+ clientId + '=' + userString;

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
              <img src="${myTrack.artwork_url}">
              <p class="song-name">${myTrack.title}</p>
              <h3 class="user-name">${myTrack.user.username}</h3>
            </div>
            `).join('')}
            </div>`;
          }
          markup = renderMyTrack();
          console.log(markup);
          document.getElementById('results').innerHTML = markup;
        });
      }

    );
}




//
// function appendSearchResults(data){
//
//     module=`
//       <div class="track">
//       <img class="track-artwork" src="${data.artwork_url}">
//       <h3 clas="song-name">${data.title}</h3>
//       </div>
//       `
//       document.getElementsByClassName("results").innerHTML = module;
// }

// 5. Create a way to listen for a click that will play the song in the audio play
