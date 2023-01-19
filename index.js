import characters from "./data.js";
import testFunction from "./test.js";

let passwordLength = document.querySelector("#pw-setting-length").value;
let passwordCharacterSet = Object.values(characters);

document.addEventListener("change", (event) => {
  setCharacterSet(event);
});

document
  .querySelector("#pw-setting-length")
  .addEventListener("input", (event) => {
    passwordLength = event.target.value;
  });

document.addEventListener("click", (event) => {
  if (event.target.id === "pw-generator-btn") {
    event.preventDefault();
    if (securityCheck()) {
      renderPw();
    }
  } else if (event.target.id === "security-issue-accept-btn") {
    renderPw();
    document.getElementById("warning-wrapper").innerHTML = ``;
  } else if (event.target.id === "security-issue-decline-btn") {
    document.getElementById("warning-wrapper").innerHTML = ``;
  } else if (event.target.classList.contains("copy-btn")) {
    copyPwToClipboard(event.target.parentElement.textContent.trim());
  } else if (event.target.classList.contains("hide-btn")) {
    event.target.previousElementSibling.classList.toggle("mask");
  }
});

function setCharacterSet(event) {
  Object.keys(characters).forEach((characterSubSet) => {
    if (event.target.value === characterSubSet) {
      if (!event.target.checked) {
        passwordCharacterSet = passwordCharacterSet.filter(
          (characterSubSet) =>
            characterSubSet !== characters[event.target.value]
        );
      } else {
        passwordCharacterSet.push(characters[event.target.value]);
      }
    }
  });
}

function securityCheck() {
  if (passwordLength >= 10 && passwordCharacterSet.length >= 3) {
    return true;
  } else {
    document.getElementById("warning-wrapper").innerHTML =
      getSecurityWarningHtml();
  }
}

function getSecurityWarningHtml() {
  return `
      <div class="warning-container">
        <h1>Warning!</h1> <br>
        <p>Your password settings tend to create an unsafe password. For a safe password choose at least three character sets and a length of 10.</p> <br>
        <p>Do you although want to create the password with current settings?</p>
        <button class="btn" id="security-issue-accept-btn">Continue with unsafe settings</button>
        <button class="btn" id="security-issue-decline-btn">Go back for safe settings</button>
      </div>
    `;
}

function renderPw() {
  document.getElementById("pw-output-one").innerHTML = getPwHtml();
  document.getElementById("pw-output-two").innerHTML = getPwHtml();
}

function getPwHtml() {
  const password = generatePw();
  return `
        <span class="pw-string mask" >${password}</span>
        <i class="fa-regular fa-eye-slash hide-btn"></i>
        <i class="fa-regular fa-copy copy-btn"></i>
    `;
}

function generatePw() {
  const passwordArray = new Array(parseInt(passwordLength))
    .fill("0")
    .map((character) => {
      return passwordCharacterSet.flat()[
        Math.floor(Math.random() * passwordCharacterSet.flat().length)
      ];
    });
  return passwordArray.join("");
}

function copyPwToClipboard(string) {
  navigator.clipboard.writeText(string);
}

// testing
// testFunction(10000)
