const loader = document.querySelector(".loader");


function getitems() {
  fetch("http://10.0.0.55//home/app/production", {
    method: "GET",
    headers: {
      authorization: "",
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })
    .then((data) => {
      // если мы попали в этот then, data — это объект
      showSpinner(true);
      console.log(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      showSpinner(false);
    });
}

function showSpinner(isLoading) {
  if (isLoading) {
    loader.classList.remove("loader_hidden");
  } else {
    loader.classList.add("loader_hidden");
  }
}

getitems();
