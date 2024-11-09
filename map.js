// Import Leaflet if you're using modules, or include the Leaflet CDN in your HTML file
// import L from 'leaflet';

export const generateMap = () => {
   let places = [
      {
         name: "Piazza del Duomo",
         coords: [45.4639102, 9.1906426]
      }
   ];

   // Define the initial zoom and max zoom levels
   const zoom = 12;
   const maxZoom = 19;
   let map; // To store the Leaflet map instance

   return {
      // Method to build the map
      build: () => {
         map = L.map("map").setView(places[0].coords, zoom);
      },

      // Method to render the map tiles and markers
      render: () => {
         if (!map) {
            console.error("Map has not been built yet. Please call build() first.");
            return;
         }
         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: maxZoom,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         }).addTo(map);

         places.forEach((place) => {
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.name}</b>`);
         });
      },

      // Method to add additional places dynamically
      addPlace: (place) => {
         places.push(place);
         console.log(places)
      },
      getPlaces: ()=>{
         return places;
      },
      addAllPlaces: (p)=>{
         places = p;
      }
   };
};
