let exercise;
let duration;

const modalDiv = document.querySelector("#modal");
const time = document.querySelector("#duration")

const openModal = () => {
  console.log("clicked")
  modalDiv.classList.add("is-active");
}

const getExercise = (activity) => {
  exercise = activity
  console.log(activity, exercise)
}

const getDuration = () => { // runs when you click save changes
  duration = time.value
  console.log(exercise, duration)
  modalDiv.classList.remove("is-active");
}

const cancel = () => {
  modalDiv.classList.remove("is-active");
  duration.value = ""
}


const api_id = '99057361'
const api_key = '1df7869712abb0a0b446923862e0f733'
const url = 'https://trackapi.nutritionix.com/v2/natural/exercise'


const headers = {
    'Content-Type': 'application/json',
    'x-app-id': api_id,
    'x-app-key': api_key,
    'x-remote-user-id': '0'
}

let query = {
    "query": "ran 3 miles and then walked 4 kilometers",
    /*"gender": "female",
    "weight_kg": 72.5,
    "height_cm": 167.64,
    "age": 30*/
}

fetch(url, {
        "headers": headers,
        "body": JSON.stringify(query),
        "method": "POST"
    })
    .then(response => response.json())
    .then(myJson => {
        console.log(myJson);

  myJson.exercises.forEach(exercise => {
    let card = `
<div class="card">
   <div class="card-content">
      <div class="content">
      <nobr>
        <div class="column">
           <h1>
              ${exercise.name}
           </h1>
         </div>
         <div class="column">
           <h1>
              ${exercise.duration_min} minutes
           </h1>
         </div></nobr>
         <div class="column">
           <h1>
              ${exercise.nf_calories} calories burned!
           </h1>
         </div>
      </div>
   </div>
</div>
                `;
  
        document.getElementById("cards").innerHTML = card + document.getElementById("cards").innerHTML;
    
  })
        
    });
