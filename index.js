const studentName = document.createElement("div");
const weightCounter = document.createElement("div");
const minusButton = document.createElement("button");
minusButton.innerText = "-";
const addButton = document.createElement("button");
addButton.innerText = "+";
const counter = document.createElement("p");
counter.innerText = 1;

weightCounter.appendChild(minusButton);
weightCounter.appendChild(counter);
weightCounter.appendChild(addButton);

studentName.classList.add("student-name");
weightCounter.classList.add("weight-counter");
minusButton.classList.add("minus-button");
addButton.classList.add("add-button");
counter.classList.add("counter");

const randomName = "";
const weight = 1;

function addWeight() {
  weight + 1;
}

function subtractWeight() {
  if (weight > 1) {
    weight - 1;
    return weight;
  } else {
    return weight;
  }
}

async function fetchNames() {
  try {
    const response = await fetch("https://api.devpipeline.org");
    const answer = await response.json();
    console.log(answer);
    data.push(answer);
  } catch (error) {
    console.log("Error:", error);
  }
}

const studentList = fetchNames();
let nameArray = [];

studentList.forEach((student) => {
  const fullName = `${student.firstName} ${student.lastName}`;
  nameArray.push(fullName);
});

console.log(nameArray);

function weightNames() {
  for (i in weight) {
    nameArray.push(fullName);
  }
}

const minusButton = document.querySelector(".minus-button");
minusButton.addEventListener("click", subtractWeight);

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addWeight);

function getRandomName(nameArray) {
  const randomIndex = Math.floor(Math.random() * nameArray.length);
  randomName = nameArray[randomIndex];
  return randomName;
}

const genBtn = document.querySelector(".gen-btn");
genBtn.addEventListener("click", getRandomName);

const selectedName = document.querySelector(".selected-name");
selectedName.textContent = randomName;
nameArray.splice();

// document.selected-name.animate(
//   [
//     { color: $cerulean },
//     { color: $indian-red },
//     { color: $ecru },
//     { color: $verdigris },
//     ],
//   {
//     duration: 20000,
//     iterations: Infinity,
//   }
// );
