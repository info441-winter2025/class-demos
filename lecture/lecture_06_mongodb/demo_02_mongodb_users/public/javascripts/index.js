async function getDinos() {
    console.log("getting dinos");
    let response = await fetch("api/getDinos");
    let dinos = await response.json();
console.log('dinos', dinos);
    let html = dinos.map(item => {
        return `
          <div>
             <p>${item.Genus}</p>
             <img src="${item.img}" />
          </div>
        `
    })

    document.getElementById('results').innerHTML = html;
}

async function saveUserData() {
    let name = document.getElementById("name").value;
    let icecream = document.getElementById("icecream").value;
    console.log(name, icecream);

    const myData = {
        name: name,
        icecream: icecream
    }

    // send POST to server
    const response = await fetch("api/users", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

async function getUsers() {
    const response = await fetch("api/users")
    const userData = await response.json();
    console.log(userData);

    document.getElementById("results").innerHTML = JSON.stringify(userData)
}