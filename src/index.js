document.addEventListener('DOMContentLoaded', () => {

})

const BASEURL = `http://localhost:3000/dogs/`;

//get all the dogs
function getDogs(){
    debugger
    return fetch(BASEURL)
    .then(resp => resp.json())
}

//edit a dog
function updateDog (dog) {
    return fetch(BASEURL + `/${dog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dog)
    }).then(resp => resp.json())
  }


//get HTML elements

const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")



// add a single dog to the page
function addDog(dog){
    let dogtr = document.createElement('tr')
    let editBtn = document.querySelector('button') 

    let dogNameTd = document.createElement('td')
            dogNameTd.innerText = dog.name

    let dogBreedTd = document.createElement('td')
            dogBreedTd.innerText = dog.breed 

    let dogSexTd = document.createElement('td')
            dogSexTd.innerText = dog.sex

    let dogEditTd = document.createElement('td')
    
    let dogEditButton = document.createElement('button') 
            dogEditButton.dataset.id = dog.id    
            dogEditButton.className = 'button'
            dogEditButton.innerText = "Edit"

    dogEditButton.addEventListener('click', () => editDog(dog)) 

   
    dogEditTd.append(dogEditButton)
    dogtr.append(dogNameTd, dogBreedTd, dogSexTd, dogEditTd)

    tableBody.appendChild(dogtr);

    
}

function editDog(dog){

    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    dogForm.dataset.id = dog.id
   }




// function addEventListenerToBtn(){
//     let editBtn = document.querySelector('.button') 

//     editBtn.addEventListener("click", function(event){
//         console.log(event.target.dataset.id);
//     })
//     }


//add multiple dogs to page
function addAllDogs(dogs){
    tableBody.innerHTML = ""
    dogs.forEach(dog => addDog(dog))
}


function updateDogToServer(event){
    event.preventDefault()

    return fetch(BASEURL + dogForm.dataset.id,{
        method: "PATCH", 
        headers: {
            'Content-Type': 'application/json'
          }, 
        body: JSON.stringify(
            {
                name: dogForm.name.value,
                breed: dogForm.breed.value,
                sex: dogForm.sex.value
            }
        )
    })
    .then(() => {
        dogForm.reset()
        init()
    })
}

dogForm.addEventListener('submit', updateDogToServer)

function init(){
    fetch(BASEURL)
        .then(data => data.json())
        .then(dogs => addAllDogs(dogs));
}

init()
