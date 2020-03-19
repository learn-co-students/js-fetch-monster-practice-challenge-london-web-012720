document.addEventListener("DOMContentLoaded", function() {


    const createMonster = document.querySelector("#create-monster")
    const monsterContainer = document.querySelector("#monster-container")

    const baseUrl = "http://localhost:3000/"
    const monstersUrl = baseUrl + "monsters/?_limit=50&_page=3"


    const createForm = (monster) => {

        const newForm = document.createElement("form")
        const inputName = document.createElement("input")
        const inputAge = document.createElement("input")
        const inputDescript = document.createElement("input")


        inputName.type = "text"
        inputName.name = "name"
        inputAge.name = "age"
        inputDescript.name = "description"

        createMonster.append(newForm) 
        newForm.append(inputName, inputAge, inputDescript)
        

        newForm.addEventListener("submit", (event) => {
            event.preventDefault()

            const name = event.target.name.value
            const age = event.target.age.value
            const description = event.target.description.value

            fetch( monstersUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify( {
                    name: name,
                    age: age,
                    description: description
                })
            })
            .then( resp => resp.json() )
            
        } );

    }
    createForm()



    const renderAllMonsters = (monsters) => {
        monsters.forEach(renderMonster)
    }

    const fetchAllMonsters = () => {
        return fetch(monstersUrl)
        .then( resp => resp.json() )
    }

    fetchAllMonsters().then(renderAllMonsters)


    const renderMonster = (monster) => {

        const monsterName = document.createElement("p")
        monsterName.innerHTML = monster.name 

        const monsterAge = document.createElement("p")
        monsterAge.innerText = monster.age 

        const monsterDescript = document.createElement("p")
        monsterDescript.innerHTML = monster.description 

        monsterContainer.append(monsterName, monsterAge, monsterDescript)

    }





})