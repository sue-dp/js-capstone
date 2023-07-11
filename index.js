const email = "sue@devpipeline.com";
const pass = "One2threesf@1";
let resObject;
const userData = {
  email: email,
  password: pass,
};

async function authorize() {
  try {
    const result = await fetch("https://api.devpipeline.org/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resObject = await result.json();
    const authToken = resObject.auth_info.auth_token;
    return authToken;
  } catch (error) {
    console.error("Error: ", error);
  }
}
async function fetchNames() {
  try {
    const getAuth = await authorize();
    const response = await fetch("https://api.devpipeline.org/users", {
      headers: { auth_token: getAuth },
    });
    const answer = await response.json();
    console.log(answer.users);
    return answer.users;
  } catch (error) {
    console.log("Error:", error);
  }
}

const studentName = document.createElement("div");
const weightCounter = document.createElement("div");
const minusButton = document.createElement("button");
minusButton.innerText = "-";
const addButton = document.createElement("button");
addButton.innerText = "+";
const counter = document.createElement("p");
counter.innerText = 1;
const nameList = document.querySelector(".name-list");
weightCounter.appendChild(minusButton);
weightCounter.appendChild(counter);
weightCounter.appendChild(addButton);

studentName.classList.add("student-name");
weightCounter.classList.add("weight-counter");
minusButton.classList.add("minus-button");
addButton.classList.add("add-button");
counter.classList.add("counter");

let randomName = "";
let weight = 1;
let nameArray = [];

async function getNames() {
  try {
    const studentList = await fetchNames();

    studentList.forEach((student) => {
      const fullName = `${student.first_name} ${student.last_name}`;
      nameArray.push(fullName);
      return nameArray;
    });
  } catch (error) {
    console.log("Error:", error);
  }

  console.log(nameArray);
}

getNames();

async function populateNames () {
  try {
    const populateNames = await getNames();

    for (i in nameArray) {
    nameList.appendChild(nameArray[i]);
    nameList.appendChild(weightCounter);
  }}
}

populateNames()

function addWeight() {
  weight + 1;
  return weight;
}

function subtractWeight() {
  if (weight > 1) {
    weight - 1;
    return weight;
  } else {
    return weight;
  }
}


function weightNames() {
  for (i in weight) {
    nameArray.push(fullName);
  }
  // minusButton = document.querySelector(".minus-button");
  minusButton.addEventListener("click", subtractWeight);

  // addButton = document.querySelector(".add-button");
  addButton.addEventListener("click", addWeight);
}

function getRandomName(nameArray) {
  let randomIndex = Math.floor(Math.random() * nameArray.length);
  randomName = nameArray[randomIndex];
  return randomName;
}
const genBtn = document.querySelector(".gen-btn");
genBtn.addEventListener("click", getRandomName);

const selectedName = document.querySelector(".selected-name");
selectedName.textContent = randomName;

// nameArray.splice();

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
