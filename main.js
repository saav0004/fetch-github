//select .btn from html
let btn = document.querySelector(".btn");

//event
btn.addEventListener("click", getUser);

function getUser(ev) {
  let input = document.getElementById("username").value.trim();
  let url = `https://api.github.com/users/${input}/repos`;
  let repoUL = document.querySelector(".user-repos");
  let df = new DocumentFragment();

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
          <p class="content__title">
          <a class="content__a" href="${element["html_url"]}" target="_blank" >${element["name"]}</a>
          </p>
          <p class="content__p">Watchers: ${element["watchers"]}</p>
          <p  class="content__p">Open Issues: ${element["open_issues"]}</p>`;
          df.append(li);
        });
        repoUL.append(df);
      })
      .catch((err) => {
        let nm = err.name;
        let msg = err.message;
        alert(`CATCH: ${nm} ${msg}`);
      });
  }
}
