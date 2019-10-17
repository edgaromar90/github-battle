const id = 'YOUR_CLIENT_ID'
const sec = 'YOUR_SECRET_ID'
const params = `?client_id=${id}&client_secret=${sec}`

//Detect an Error in Github's API response
function getErrorMsg (message, username) {
  if (message === 'Not Found'){
    return `${username} doesn't exist`
  }

  return message
}

//Get user's profile
function getProfile (username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((response) => response.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username))
      }

      return profile
    })
}

//Get Repositories for the username
function getRepos (username) {
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((response) => response.json())
    .then((repos) => {
      if(repos.message) {
        throw new Error(getErrorMsg(repos.message, username))
      }

      return repos
    })
}

//Sum all the stars in all the repositories
function getStarCount (repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count ,0)
}

//Creates the score based on followers and Stars
function calculateScore (followers, repos) {
  return (followers * 3) + getStarCount(repos)
}

//get user's data and generate a score
function getUserData (player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}

//Sort by score
function sortPlayers (players) {
  return players.sort((a, b) => b.score - a.score)
}

//Gather data from both players and battle using their score
export function battle (players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])]
  ).then((results) => sortPlayers(results))
}

//Fetch Github's popular repositories
export function fetchPopularRepos (language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}