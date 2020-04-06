let page = 1;
// let MONSTER_API = (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)

let MONSTER_API = (`http://localhost:3000/monsters/?_limit=50&_page=`)


document.addEventListener("DOMContentLoaded", () => {
    const createDiv = document.getElementById("create-monster")
    const monsterCollection = document.getElementById("monster-container")

    const back = document.getElementById("back")
    const forward = document.getElementById("forward")

    back.addEventListener('click', () => {
        if (page > 0) {
             page-- } init();
    })

    forward.addEventListener('click', () => {
        ++page
        init();
    })

    const renderNewMonster = (monster) => {
        const monsterName = document.createElement('h2')
        monsterName.innerText = monster.name 

        const monsterAge = document.createElement('h4')
        monsterAge.innerText = monster.age 

        const monsterDescription = document.createElement('p')
        monsterDescription.innerText = monster.description

        monsterCollection.append(monsterName, monsterAge, monsterDescription)
    }

    const renderMonsters = monsters => { 
        monsters.forEach (monster => { 
        renderNewMonster(monster) 
        })
    }

    const createForm = () => {
        const form = document.createElement("form")
        form.id = "monster-form"

        const nameInput = document.createElement("input")
        nameInput.id = "name"
        nameInput.type = "text"
        nameInput.placeholder = "name"

        const ageInput = document.createElement("input")
        ageInput.id = "age"
        ageInput.type = "text"
        ageInput.placeholder = "age"

        const descriptionInput = document.createElement("input")
        descriptionInput.id = "description"
        descriptionInput.type = "text"
        descriptionInput.placeholder = "description"

        const button = document.createElement("input")
        button.type = "submit"
        button.value = "create"

        form.append(nameInput, ageInput, descriptionInput, button)
    
        createDiv.append(form)

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const config = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
                body: JSON.stringify({
                    name: event.target.name.value,
                    age: event.target.age.value.to_i,
                    description: event.target.description.value
                })
            };
            fetch(MONSTER_API, config)
            .then(res => res.json())
            .then(monster => renderNewMonster(monster))
            nameInput.value = ""
            ageInput.value = ""
            descriptionInput.value = ""
        })
    
    }
    const init = () => {
        createDiv.innerHTML = ""
        monsterCollection.innerHTML = ""
        fetch(`${MONSTER_API}${page}`)
        .then(res => res.json())
        .then(monsters => renderMonsters(monsters))
        createForm()
    }
    init();
})


