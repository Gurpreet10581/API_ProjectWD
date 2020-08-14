const baseUrl = "https://calendarific.com/api/v2";
const key = "7c2d33d3efa6447e92b6fbd2136cb9956ffbfbd9";
const endpoint = "/holidays";
let url;

const daySearch = document.getElementById("day");
const monthSearch = document.querySelector(".month");
const locationSearch = document.querySelector(".location");
const searchForm = document.querySelector("form");
const div=document.querySelector("div")

searchForm.addEventListener("submit", fetchHolidays);

function fetchHolidays(e) {
  e.preventDefault();
  // console.log(daySearch.value);
  // console.log(monthSearch.value)
  url = `${baseUrl}${endpoint}?api_key=${key}&country=us&year=2020&day=${daySearch.value}&month=${monthSearch.value}`;
  console.log("URL:", url);


  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      displayHolidays(data);
    })
    .catch((err) => console.log(err));
}

function displayHolidays(json) {
  while(div.firstChild){
    div.removeChild(div.firstChild);
  }

  let holidays=json.response.holidays;
  console.log(holidays);
  if (holidays.length === 0){
    console.log('No results');
    alert(`No Holidays Found! Try a different Date`);
  }
  else{
    for(let x = 0; x<holidays.length; x++){
      let holiday = document.createElement('div');
      let title=document.createElement('h3');
      let date= document.createElement('h5');
      let description = document.createElement('p');
      let type= document.createElement('h5');
      let location= document.createElement('h5')
      let details= document.createElement('div');
      holiday.setAttribute('class', 'miniDiv');

      let current = holidays[x];
      // console.log('Current:', current);

      title.textContent= current.name;
      date.textContent= current.date.iso;
      type.textContent='Type: '+ ' ' + current.type;
      location.textContent='Location: '+ ' ' + current.locations;
      description.textContent = 'Description: '+ ' ' + current.description;

     
      details.setAttribute('Class', 'details'); 

      holiday.appendChild(title);
      holiday.appendChild(date);
      holiday.appendChild(type);
      holiday.appendChild(location);
      holiday.appendChild(description);

      div.appendChild(holiday);
    }
  }
 
}
