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

let studentName;
let weightCounter;

let counter;
let nameList = document.querySelector(".name-list");

let randomName = "";
let weight = 1;

let fullName = "";

let shuffledArray = [];
let unchangingArray = [];
let chosenNames = [];

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function getNames() {
  try {
    const studentList = await fetchNames();

    studentList.forEach((student) => {
      fullName = `${student.first_name} ${student.last_name}`;
      shuffledArray.push(fullName);
      unchangingArray.push(fullName);
    });
    shuffledArray = shuffleArray(shuffledArray);
  } catch (error) {
    console.log("Error:", error);
  }
  console.log(shuffledArray);
}

const minusButton = document.createElement("button");
minusButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
minusButton.classList.add("minus-button");
const addButton = document.createElement("button");
addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
addButton.classList.add("add-button");

async function populateNames() {
  try {
    await getNames();

    for (let i in shuffledArray) {
      const studentName = document.createElement("div");
      const weightCounter = document.createElement("div");
      const counter = document.createElement("p");

      const name = shuffledArray[i];

      studentName.textContent = name;
      studentName.classList.add("student-name");
      studentName.setAttribute("id", "student-name");

      weightCounter.classList.add("weight-counter");
      weightCounter.setAttribute("id", "weight-counter");

      counter.classList.add("counter");
      counter.setAttribute("id", "counter");
      counter.innerText = 1;

      const clonedAddButton = addButton.cloneNode(true);
      const clonedMinusButton = minusButton.cloneNode(true);

      clonedMinusButton.addEventListener("click", () => {
        const index = shuffledArray.indexOf(name);
        if (index !== -1) {
          shuffledArray.splice(index, 1);
          counter.innerText =
            parseInt(counter.innerText) > 0
              ? parseInt(counter.innerText) - 1
              : 0;
        }
        console.log(shuffledArray);
      });

      clonedAddButton.addEventListener("click", () => {
        shuffledArray.push(name);
        counter.innerText = parseInt(counter.innerText) + 1;
        console.log(shuffledArray);
      });

      weightCounter.appendChild(clonedMinusButton);
      weightCounter.appendChild(counter);
      weightCounter.appendChild(clonedAddButton);

      studentName.appendChild(weightCounter);
      nameList.appendChild(studentName);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

(async () => await populateNames())();

async function nameFlipper() {
  function delay() {
    return new Promise((resolve) =>
      setTimeout(() => {
        const flippingName =
          shuffledArray[Math.floor(Math.random() * shuffledArray.length)];
        resolve((selectedName.textContent = flippingName));
      }, 150)
    );
  }
  for (let i = 0; i < 8; i++) {
    selectedName.classList.remove("animate");
    await delay();
    selectedName.classList.add("animate");
  }
}
const genBtn = document.getElementById("gen-btn");
const selectedName = document.querySelector("#selected-name");

const myButton = async () => {
  if (shuffledArray.length >= 0) {
    if (shuffledArray.length == 0) {
      shuffledArray = [...unchangingArray];
      shuffledArray = shuffleArray(shuffledArray);
      chosenNames = [];
      selectedName.textContent = "No more names - begin again!";

      const resetCounter = document.getElementsByClassName("counter");

      for (let i of resetCounter) {
        i.innerText = 1;
      }
    } else {
      nameFlipper().then(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * shuffledArray.length);
        } while (shuffledArray.includes(randomIndex));
        const chosenName = shuffledArray[randomIndex];
        chosenNames.push(randomIndex);
        shuffledArray.splice(randomIndex, 1);
        selectedName.textContent = chosenName;
        selectedName.classList.add("animate");
      });
    }
  }
  console.log(shuffledArray);
};

genBtn.addEventListener("click", myButton);
