let page = 1;
const baseURL = "http://localhost:3000";
const monsterContain = document.querySelector("#monster-container");
const newMonsterFormContainer = document.querySelector("#create-monster");
const forward = document.querySelector("#forward");
const back = document.querySelector("#back");

let fetchMonsters = () => {
  return fetch(`${baseURL}/monsters/?_limit=50&_page=${page}`).then(res =>
    res.json()
  );
};

let newMonsterFetch = (nameM, ageM, bioM) => {
  debugger;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      name: nameM,
      age: ageM,
      description: bioM
    })
  };
  return fetch(`${baseURL}/monsters`, options);
};
let newMonsterAdd = (nameM, ageM, bioM) => {
  newMonsterFetch(nameM, ageM, bioM);
};
let newMonster = () => {
  const form = document.createElement("form");
  form.className = "form";
  const monsterNameInpt = document.createElement("input");
  monsterNameInpt.type = "text";
  monsterNameInpt.name = "name";
  monsterNameInpt.placeholder = "name...";
  const ageInpt = document.createElement("input");
  ageInpt.type = "text";
  ageInpt.name = "age";
  ageInpt.placeholder = "age...";
  const descriptionInpt = document.createElement("input");
  descriptionInpt.type = "text";
  descriptionInpt.name = "des";
  descriptionInpt.placeholder = "Bio...";
  const submitBtn = document.createElement("input");
  submitBtn.type = "submit";
  submitBtn.value = "Create new monster";
  monsterContain.append(form);
  form.append(monsterNameInpt, ageInpt, descriptionInpt, submitBtn);
  form.addEventListener("submit", event => {
    event.preventDefault();
    newMonsterAdd(
      event.target.name.value,
      event.target.age.value,
      event.target.des.value
    );
    descriptionInpt.value = "";
    monsterNameInpt.value = "";
    ageInpt.value = "";
  });
};

let renderMonsters = monsters => {
  monsters.forEach(monster => renderMonster(monster));
};

let renderMonster = monster => {
  card = document.createElement("div");
  card.className = "card";
  monsterName = document.createElement("h3");
  monsterName.innerText = monster.name;
  age = document.createElement("h4");
  age.innerText = `Age: ${monster.age}`;
  br = document.createElement("br");
  description = document.createElement("p");
  description.innerText = `Bio: ${monster.description}`;
  card.append(monsterName, age, description);
  monsterContain.append(card, br);
};

let init = () => {
  newMonsterFormContainer.innerHTML = "";
  monsterContain.innerHTML = "";
  newMonster();
  fetchMonsters().then(renderMonsters);
};

forward.addEventListener("click", () => {
  ++page;
  init();
});
back.addEventListener("click", () => {
  if (page > 0) {
    --page;
    init();
  } else {
    alert("no more monsters");
  }
});
init();
