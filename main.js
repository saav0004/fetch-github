const btn = document.querySelector(".btn");
const input = document.querySelector(".content__input");

btn.addEventListener("click", getUser);

function getUser(ev) {
  const inputValue = document.getElementById("username").value.trim();
  input.value = inputValue;
  const url = `https://api.github.com/users/${inputValue}/repos`;
  const repoUL = document.querySelector(".user-repos");
  const noRepo = document.querySelector(".no-repos");
  const df = new DocumentFragment();

  if (inputValue === "") {
    noRepo.innerHTML = "";
    repoUL.innerHTML = "";
    h2Message = document.createElement("h2");
    h2Message.innerHTML = `Please provide a username in the field`;
    df.append(h2Message);
    noRepo.append(df);
  } else {
    noRepo.innerHTML = "";
    repoUL.innerHTML = "";
    fetch(url)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.length === 0) {
          h2Message = document.createElement("h2");
          h2Message.innerHTML = `User "${inputValue}" does not have any public repositories...try another username.`;
          df.append(h2Message);
          noRepo.append(df);
        } else {
          obj.forEach((element) => {
            const li = document.createElement("li");
            li.innerHTML = `
          <p class="content__title">
          <a class="content__a" href="${element["html_url"]}" target="_blank" >${element["name"]}</a>
          </p>
          <p class="content__p">Watchers: ${element["watchers"]}</p>
          <p  class="content__p">Open Issues: ${element["open_issues"]}</p>`;
            df.append(li);
          });
          repoUL.append(df);
        }
      })
      .catch((err) => {
        h2Message = document.createElement("h2");
        h2Message.innerHTML = `Oops! Looks like that is not a valid username...try again,`;
        df.append(h2Message);
        noRepo.append(df);
      });
  }
}
