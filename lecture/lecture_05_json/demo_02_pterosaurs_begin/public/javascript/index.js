async function getDinos() {
    let response = await fetch("api/getDinos")
    let PterosaurJson = await response.json()
 
    let PterosaurHtml = PterosaurJson.map(onePterosaur => {
        return `
        <div>
          <p>${onePterosaur.Genus}</p>
          <img src="${onePterosaur.img}" />
        </div>
        `
    }).join("")
 
    document.getElementById('results').innerHTML = PterosaurHtml
}