//select .btn from html
let btn = document.querySelector(".btn");

//event
btn.addEventListener("click", getUser);

function getUser(ev) {
  let input = document.getElementById("username").value.trim();
  let url = `https://api.github.com/users/${input}/repos`;
  let urlFollowers = `https://api.github.com/users/${input}/followers`;
  let repoUL = document.querySelector(".user-repos");
  let followerUL = document.querySelector(".follower-info");
  let df = new DocumentFragment();
  let dfFollowers = new DocumentFragment();

  if (input === "") {
    alert("Not a valid input");
  } else {
    repoUL.innerHTML = "";
    fetch(url)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        obj.forEach((element) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <p>
          <a href="${element["html_url"]}" target="_blank" >${element["name"]}</a>
          </p>
          <p>Watchers: ${element["watchers"]}</p>
          <p>Open Issues: ${element["open_issues"]}</p>`;
          df.append(li);
        });
        repoUL.append(df);
      })
      .catch((err) => {
        let nm = err.name;
        let msg = err.message;
        alert(`CATCH: ${nm} ${msg}`);
      });
    followerUL.innerHTML = "";
    fetch(urlFollowers)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        obj.forEach((element) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <img src="${element["avatar_url"]}" alt="${element["login"]}" />
          <a href="${element["html_url"]}" target="_blank">${element["login"]}</a>`;
          dfFollowers.append(li);
        });
        followerUL.append(dfFollowers);
      })
      .catch((err) => {
        let nm = err.name;
        let msg = err.message;
        alert(`CATCH: ${nm} ${msg}`);
      });
  }
}
