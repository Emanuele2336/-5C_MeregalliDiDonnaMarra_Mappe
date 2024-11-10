import { generateMap } from "./map.js";
import { fetchComponent } from "./fetch.js";

const apiTokenLocation = "pk.215a9e370a8ded2ada287a67d2b90aaf"
const btnInvia=document.querySelector("#prenotaButton")//bottone per inviare l'indirizzo
const indirizzo=document.querySelector("#idIndirizzo");//campo i testo dove inserire l'indirizzo
const popup=document.getElementById("popup");//campo i testo dove inserire l'indirizzo
const cittaInserimento=document.querySelector("#indirizzoCitta");
let template=`
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>`
let map = generateMap();
let fetchC = fetchComponent();
fetchC.build("cb6e2971-c0e8-4b36-99a3-4792429bab2f");
map.build();
fetchC.getData("places").then(res =>{
    map.addAllPlaces(res)
    map.render();
})

btnInvia.onclick=()=>{
    let url ="https://us1.locationiq.com/v1/search?key="+apiTokenLocation+"&q=%20%STRADA%2C%20%CITTA&format=json&";
    let street = indirizzo.value;
    let city = cittaInserimento.value;
    url = url.replace("%STRADA",street).replace("%CITTA",city)
    console.log(url);
    fetch(url)
    .then(data => data.json())
    .then(result => {
        console.log(result);
        let name = result[0].display_name
        let lat = result[0].lat
        let lon = result[0].lon
        let data = {
            name : name,
            coords : [lat,lon]
        }
        indirizzo.value="";
        cittaInserimento.value="";
        map.addPlace(data)
        map.render();
        fetchC.setData("places",map.getPlaces());
        
    });
}