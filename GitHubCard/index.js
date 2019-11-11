/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// User data request
// axios.get('https://api.github.com/users/reggieTheCoder')
//   .then(response => console.log(response))
//   .catch(error => console.log(error))

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

 data:
avatar_url: "https://avatars2.githubusercontent.com/u/33520187?v=4"
bio: "Lambda School Full Stack web Development Student "
followers: 2
followers_url: "https://api.github.com/users/reggieTheCoder/followers"
following: 3
following_url: "https://api.github.com/users/reggieTheCoder/following{/other_user}"
html_url: "https://github.com/reggieTheCoder"
id: 33520187
location: "Bloomfield, New Jersey "
login: "reggieTheCoder"
name: "Reginald Alford "
public_repos: 33
repos_url: "https://api.github.com/users/reggieTheCoder/repos"
   Skip to Step 3.
   
*/


/* Step 4: Pass the data received from Github into your function, 
  create a new component and add it to the DOM as a child of .cards
*/

// Reference for GitHub API
const gitRef = `https://api.github.com/users/`;

//reference the cards div 
const cards = document.querySelector('.cards');

//get user data from GitHub API
axios.get(`${gitRef}reggieTheCoder`)
  .then(response => {
    console.log(response)

    //create a user card using the response data, add that data to the DOM via appendChild
    cards.appendChild(createCard(response.data));

    //Retrieve user's followers
    return response.data.followers_url;
  })

  .then(followersUrl => {
    //Get user's followers data via axios call
    axios.get(followersUrl)
      .then(response => {
        // iterate over followers array
        response.data.forEach(follower => {
          //  used to test the result of retieving follower string
          console.log(follower.login);

          //Get follower user data
          axios.get(`${gitRef}${follower.login}`)
            .then(response => {

              //create user card then add it to the DOM via appendChild
              cards.appendChild(createCard(response.data));  
            })

            //user data error handler for followers
            .catch(error => console.log(error))
        })
      })

      // error handler for followers
      .catch(error => console.log(error))
  })
  // data error handler for user
  .catch(error => console.log(error))

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

//Create a function that accepts a single object as its only argument,
//Using DOM methods and properties, create a component that will return the following DOM element


//Creates a card with content passed in via data parameter & appends it to the DOM .cards container. 
function createCard(data) {

  // create card div 
  const card = document.createElement('div');
  card.classList.add('card');

  // get card image
  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', data.avatar_url);

  // add image to the DOM via appendChild 
  card.appendChild(cardImg);

  //create div with the class of card-info
  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  // create an h3 element
  const fullName = document.createElement('h3');
  //  add the class name to the h3 element
  fullName.classList.add('name');
  //  add the user's name to the element
  fullName.textContent = data.name;
  //  add user's name to the DOM via appendChild
  cardInfo.appendChild(fullName);

  //  create a p element
  const loginName = document.createElement('p');
  // add the username class to the p element 
  loginName.classList.add('username');
  // add the user's login name to the p element
  loginName.textContent = data.login;
  //  add login name to the DOM via appendChild
  cardInfo.appendChild(loginName);

  //create a p element
  const location = document.createElement('p');
  //  add the user's location to the p element
  location.textContent = `Location: ${data.location}`;
  //  add the p element to the DOM via appendChild
  cardInfo.appendChild(location);

  //create a p element that will contain the profile link
  const profile = document.createElement('p');
  //  ladbel the profile element as Profile:
  profile.textContent = "Profile: ";

  //create a element
  const profileLink = document.createElement('a');
  // point the link to the user's profile
  profileLink.href = data.html_url;
  //  set profile link as the user's profile link
  profileLink.textContent = data.html_url;
  //  add the user's profile link to the DOM via appendChild
  profile.appendChild(profileLink);
  // add user's card info to the DOM via appen
  cardInfo.appendChild(profile);

  //create p element 
  const followers = document.createElement('p');
  //  add followers data to the p element
  followers.textContent = `Followers: ${data.followers}`;
  //  add followers data to the DOM via appendChild
  cardInfo.appendChild(followers);

  //create p element
  const following = document.createElement('p');
  //  add following data to the p element 
  following.textContent = `Following: ${data.following}`;
  // add following data to the DOM via appendChild
  cardInfo.appendChild(following);

  //Add bio data if the user has any
  if (data.bio !== null) {
    // create p element to house bio data
    const bio = document.createElement('p');
    //  set the bio's text to the data pulled from data.bio
    bio.textContent = `Bio: ${data.bio}`;
    //  add bio information to the DOM via appendChild
    cardInfo.appendChild(bio);
  }
  //  add cards to the DOM via appendChild
  card.appendChild(cardInfo);
  return card;
}

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/