document.addEventListener("DOMContentLoaded",()=>{
    console.log("new info")
    // fetchGithubInfo()
    githubUserInfo()
})

function githubUserInfo(){
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const search = document.getElementById('search').value
        const searchInput = search.replace(" ", "")
        console.log(searchInput)
        fetch(`https://api.github.com/users/${searchInput}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
                renderUser(data)
                userRepositories(data)  
                // console.log(data.login)
        })
    })
}
function renderUser(user){
    const li = document.createElement('li')
    li.innerHTML = `
        <img src="${user.avatar_url}"/>
        <h1>${user.login}</h2>
        <a href="${user.html_url}">Check Profile</a>
     `
    document.getElementById('user-list').appendChild(li)

}

function userRepositories(repos){
    fetch(repos.repos_url)
   .then(res => res.json())
   .then(repoData => repoData.forEach(repo => renderRepo(repo)))
}
function renderRepo(repo){
    const repoli = document.createElement('li')
    repoli.innerHTML = `${repo.name} `
    document.getElementById('repos-list').appendChild(repoli)

}