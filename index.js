const btnInserisciIndirizzo=document.querySelector("btn btn-primary");//bottone che fa apparire il pop up
const btnChiudi=document.querySelector("btn btn-secondary")//bottone per chiudere il pop up
const btnInva=document.querySelector("btn btn-primary")//bottone per inviare l'indirizzo
const indirizzo=document.getElementById("idIndirizzo");//campo i testo dove inserire l'indirizzo
const url = `https://us1.locationiq.com/v1/search?format=json`;
const token=inputToken;
//funzioneper far apparir il pop up e inserire i valori nel dizionaro places, i quali poi verranno fetchati
btnInserisciIndirizzo.onclick = () => {
   const indirizzo2=indirizzo.value;
   places.push(indirizzo2); 
    if (indirizzo2 !== undefined) {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'key': token
            },
            body: JSON.stringify({
                key:key,
                value:JSON.stringify(indirizzo2)
            })
          })
            .then(r => r.json()); {
                .then(data => r(data.result));{
            }
    }
};

fetch("https://ws.cipiaceinfo.it/cache/get", {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "key": token
    },
    body: JSON.stringify({
        key: key
    })
})
.then(r => r.json())
.then(data => {
    let coordinata = JSON.parse(data.result);
    resolve(coordinata);
    places.push(coordinata);
})
}

//cosa ho fatto: ho generato l'html di tutti gli elementi, solo che manca il pop up che non lo so far apparire. nell'index.js
//ho creato i bottoni e il campo di testo dove ineìserire il nome del luogo, il nome viene preso e inserito
//in una fetch con servizio geocoding che a partire dal nome di un posto ne restituisce le coordinate,
//poi tramite get scarichiamo le coordinate e le inseriamo nel dizionario places, il quale dovrà
//inserire ciascuna coordinata di ciscun luogo sulla mappa., manca questo pezzo credo e  l'altro coso che avevamo configurato in console 