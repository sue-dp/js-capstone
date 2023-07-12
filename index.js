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
// counter.innerText = 1;
let nameList = document.querySelector(".name-list");
// weightCounter.appendChild(minusButton);
// weightCounter.appendChild(counter);
// weightCounter.appendChild(addButton);

// studentName.classList.add("student-name");
// studentName.setAttribute("id", "student-name");
// weightCounter.classList.add("weight-counter");
// weightCounter.setAttribute("id", "weight-counter");
// minusButton.classList.add("minus-button");

// counter.classList.add("counter");

let randomName = "";
let weight = 1;

let fullName = "";

let shuffledArray = [];
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
    });
    shuffledArray = shuffleArray(shuffledArray);
  } catch (error) {
    console.log("Error:", error);
  }
  // console.log(nameArray);
  console.log(shuffledArray);
}

// getNames();
const minusButton = document.createElement("button");
minusButton.innerText = "-";
minusButton.classList.add("minus-button");
const addButton = document.createElement("button");
addButton.innerText = "+";
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

populateNames();

// function addWeight() {
//   weight + 1;
//   counter.textContent(weight);
//   nameArray.push()
//   return weight;
// }

// function subtractWeight() {
//   if (weight > 1) {
//     weight - 1;
//     counter.textContent(weight);
//     return weight;
//   } else {
//     counter.textContent(weight);
//     return weight;
//   }
// }

// function weightNames() {
//   for (i in weight) {
//     nameArray.push(fullName);
//   }
//   // minusButton = document.querySelector(".minus-button");
//   minusButton.addEventListener("click", subtractWeight);

//   // addButton = document.querySelector(".add-button");
//   addButton.addEventListener("click", addWeight);
// }
const genBtn = document.getElementById("gen-btn");
const selectedName = document.querySelector("#selected-name");
const unchangingArray = [...shuffledArray];

genBtn.addEventListener("click", () => {
  if (shuffledArray.length >= 0) {
    if (shuffledArray.length == 0) {
      getNames();
      shuffledArray = shuffleArray(shuffledArray);
      chosenNames = [];
      selectedName.textContent = "All names have been selected";
      const resetCounter = document.getElementsByClassName("counter");

      console.log(resetCounter);
      for (let i of resetCounter) {
        // const counter = document.getElementById("counter");
        i.innerText = 1;
      }
    } else {
      // Reset chosen names array

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * shuffledArray.length);
      } while (shuffledArray.includes(randomIndex));

      // for (let i = 0; i < 10; i++) {
      //   setTimeout(() => {
      //     const randomName =
      //       unchangingArray[Math.floor(Math.random() * unchangingArray.length)];
      //     selectedName.textContent = randomName;
      //   }, 100 * i);
      // }

      const chosenName = shuffledArray[randomIndex];
      chosenNames.push(randomIndex);
      shuffledArray.splice(randomIndex, 1);
      selectedName.textContent = chosenName;
      selectedName.classList.add("animate");
    }
    console.log(shuffledArray);
  }
});

//     const randomIndex = Math.floor(Math.random() * shuffledArray.length);
//     const randomName = Array[randomIndex];
//     selectedName.textContent = randomName;
//   } else {
//     selectedName.textContent = "No names available";
//   }
// });
// function getRandomName(nameArray) {
//   let randomIndex = Math.floor(Math.random() * nameArray.length);
//   randomName = nameArray[randomIndex];
//   return randomName;
// }
// const genBtn = document.querySelector(".gen-btn");
// genBtn.addEventListener("click", getRandomName);

// let selectedName = document.querySelector(".selected-name");
// selectedName.textContent = randomName;

// nameArray.splice();

// async function animateSelectedName() {
//   const animation = await
// }
