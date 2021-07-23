const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            if (key === passcode.value) {
                const message = document.querySelector('#message');
                message.innerHTML = data[key].message;
            }


            let card = `
            <div class="card">
               <div class="card-content">
                  <div class="content">
                  <nobr>
                    <div class="column">
                       <h1>
                          ${data[key].name}
                       </h1>
                     </div>
                     <div class="column">
                       <h1>
                          ${data[key].duration} minutes
                       </h1>
                     </div></nobr>
                     <div class="column">
                       <h1>
                          ${data[key].calories} calories burned!
                       </h1>
                     </div>
                  </div>
               </div>
            </div>
                            `;
              
                    document.getElementById("cards").innerHTML = card + document.getElementById("cards").innerHTML;
        }
    });
















const api_id = '99057361'
const api_key = '1df7869712abb0a0b446923862e0f733'
const url = 'https://trackapi.nutritionix.com/v2/natural/exercise'


const headers = {
    'Content-Type': 'application/json',
    'x-app-id': api_id,
    'x-app-key': api_key,
    'x-remote-user-id': '0'
}

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
  let query = {
    "query": `${exercise} for ${duration} minutes`,
    /*"gender": "female",
    "weight_kg": 72.5,
    "height_cm": 167.64,
    "age": 30*/
}
  console.log(query)
fetch(url, {
        "headers": headers,
        "body": JSON.stringify(query),
        "method": "POST"
    })
    .then(response => response.json())
    .then(myJson => {
        console.log(myJson);

    console.log("on submit")


  myJson.exercises.forEach(exercise => {

    const payload = {
        name: exercise.name,
        duration: exercise.duration_min,
        calories: exercise.nf_calories
    }
    firebase.database().ref().push(payload)

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
  modalDiv.classList.remove("is-active");
}

const cancel = () => {
  modalDiv.classList.remove("is-active");
  duration.value = ""
}





