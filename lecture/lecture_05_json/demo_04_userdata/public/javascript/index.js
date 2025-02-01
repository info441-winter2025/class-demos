async function createUser(){
  let name = document.getElementById("name").value;
  let icecream = document.getElementById("icecream").value;
  let myData = {
    name: name,
    icecream: icecream
  }
  
  console.log(myData);
  
  let response = await fetch("api/users", {
    method: "POST",
    body: JSON.stringify(myData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


async function saveUserData() {
  let name = document.getElementById("name").value;
  let icecream = document.getElementById("icecream").value;
  console.log(name, icecream);
}

async function getUsers() {
  let response = await fetch("api/users")
  let userData = await response.json()
  console.log(userData)

  document.getElementById("results").innerHTML = JSON.stringify(userData)
}