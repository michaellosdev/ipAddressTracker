const searchInput = document.querySelector('#ip-search')
const searchBtn = document.querySelector('#ip-search-btn')
const ipAddressText = document.querySelector('#ipAddress')
const locationText = document.querySelector('#location')
const timezoneText = document.querySelector('#timezone')
const ispText = document.querySelector('#isp')
const errorMesage = document.getElementById('error-message')

let ipAddress

//MAP VARIABLES
var map = L.map('map', {
  zoom: 13,
  doubleClickZoom: true
  
})

var location  
var marker



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
//



//users geolocation

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  map.setView([latitude, longitude])
  marker = L.marker([latitude, longitude]).addTo(map)
  marker.bindPopup('My Location').openPopup()
  
  
});


searchBtn.addEventListener('click', search)


function search() {
  ipAddress = searchInput.value
  console.log(ipAddress)

  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_FpdVnWz8LMVTbzIs5P2YeejXTpBGl&ipAddress=${ipAddress}&domain=${ipAddress}`)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Please enter valid IP or domain address')
  })
  .then(data => {
      let lat = data.location.lat
      let lon = data.location.lng
      let ip = data.ip
      let location = data.location.city + ', ' + data.location.region + ', ' + data.location.country
      let timezone = data.location.timezone
      let isp = data.isp

      ipAddressText.textContent = ip
      locationText.textContent = location
      timezoneText.textContent = timezone
      ispText.textContent = isp

      marker = L.marker([lat, lon]).addTo(map)
      marker.bindPopup(ip).openPopup()
  

      map.setView([lat, lon])
      marker = L.marker([lat, lon]).addTo(map)
  })

  .catch(err => {
    errorMesage.textContent = ' ' + err
    errorMesage.style.visibility = 'visible'
  } )



}







