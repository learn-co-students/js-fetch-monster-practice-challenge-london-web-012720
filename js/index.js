MONSTER_URL = "http://localhost:3000/monsters"


//append the ul list to the div monster container and all the ul attached to it
pageN = 0

const divMonster = document.querySelector("#monster-container")
  const ul = document.createElement("ul")
   ul.setAttribute("class", "monster-list")
  divMonster.append(ul)


document.addEventListener("DOMContentLoaded", () => {

  fetch(MONSTER_URL)
  .then(response => response.json())
  .then(obj => showMonsters(obj))

  monsterForm()

})


function monsterForm(){

const createDiv = document.querySelector("#create-monster")

const form = document.createElement("form")
form.setAttribute("class", "monster-form")


const inputName = document.createElement("input")
inputName.setAttribute("id", "name")
inputName.setAttribute("placeholder", "name")

const inputAge = document.createElement("input")
inputAge.setAttribute("id", "age")
inputAge.setAttribute("placeholder", "age")

const inputDescription = document.createElement("input")
inputDescription.setAttribute("id", "description")
inputDescription.setAttribute("placeholder", "description")

const btnCreate = document.createElement("button")
btnCreate.setAttribute("type", "submit")
btnCreate.innerText = "Create Monster"

form.addEventListener("submit", event => {
  event.preventDefault();
  name = event.target.name.value;
  age = event.target.age.value;
  description = event.target.description.value;
  createMonster(name, age, description)
  .then(monster => {appenMonster(monster, ul), form.style.display = "none"})
  form.reset()
})

form.append(inputName, inputAge, inputDescription, btnCreate)

form.style.display = "none"

const hideForm = document.createElement("button")
hideForm.innerText = "Add Pokemon"
hideForm.addEventListener("click", event => {
  form.style.display = ""
})

createDiv.append(form, hideForm)
}


function createMonster(name, age, description) {
  const confObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          name: name,
          age: age,
          description: description
      })
  }

  return fetch(MONSTER_URL, confObj)
      .then(response => response.json())
   
}


function showMonsters(monsters){
   let num = 2
    let num2 = 0

    // create an event for forward button every time add to the slice method number 
  const btnForward = document.querySelector("#forward")
  btnForward.innerText = `page ${pageN = 1} =>`
  btnForward.addEventListener("click", event =>{
    event.preventDefault();
    btnBack.innerText = `<= page ${pageN += 1}`
    btnForward.innerText = `page ${pageN += 1} =>`;
 
     
        num += 2
        num2 += 2
    
     showMonsterList(monsters, num2, num)
   
  })
// create an event for back button every time add to the slice method number 
  const btnBack = document.querySelector("#back")
  btnBack.innerText = `<= page ${pageN  = 0}`
  btnBack.addEventListener("click", event =>{
    btnForward.innerText = `page ${pageN -= 1} =>`
    btnBack.innerText = `<= page ${pageN -= 1}`
    
     event.preventDefault();
    num = num - 2
    num2 = num2 - 2
     showMonsterList(monsters, num2, num);
  })

  
  showMonsterList(monsters, num2, num)
}



function showMonsterList(monsters, num2, num){
  ul.innerText = ""
monsters.slice(num2, num).forEach(monster => {
  
  appenMonster(monster)
})
}

function appenMonster(monster){
  const li = document.createElement("li")
  li.setAttribute("id", monster.id)

  const h1 = document.createElement("h1")
  h1.innerText = monster.name
  
  const h3 = document.createElement("h3")
  h3.innerText = `Age: ${monster.age}`

  const p = document.createElement("p")
  p.innerText = `Description:   ${monster.description}`
 
  li.append(h1, h3, p)
  ul.append(li)

}