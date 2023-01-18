import characters from "./data.js";
import testFunction from "./test.js";

const settingsForm = document.querySelector("form");

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

function securityCheck() {
  const pwSettings = getPwSettings();
  const { pwLength, charSetChoiceArray } = pwSettings;
  if (pwLength >= 10 && charSetChoiceArray.length >= 3) {
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
  const pwSettings = getPwSettings();
  const passWord = generatePw(pwSettings);
  return `
        <span class="pw-string mask" >${passWord}</span>
        <i class="fa-regular fa-eye-slash hide-btn"></i>
        <i class="fa-regular fa-copy copy-btn"></i>
    `;
}

function getPwSettings() {
  const pwSettingsFormData = new FormData(settingsForm);
  const pwLength = parseInt(pwSettingsFormData.get("pw-setting-length"));

  let charSetChoiceArray = pwSettingsFormData.getAll("pw-setting-characters");
  let pwCharSet = [];
  charSetChoiceArray.forEach((charSetChoice) => {
    return pwCharSet.push(characters[charSetChoice]);
  });
  pwCharSet = pwCharSet.flat();

  return {
    pwLength: pwLength,
    pwCharSet: pwCharSet,
    charSetChoiceArray: charSetChoiceArray,
  };
}

function generatePw(pWSettingsObject) {
  const { pwLength, pwCharSet } = pWSettingsObject;
  const pwArray = new Array(pwLength).fill("0").map((char) => {
    return pwCharSet[Math.floor(Math.random() * pwCharSet.length)];
  });
  return pwArray.join("");
}

function copyPwToClipboard(string) {
  navigator.clipboard.writeText(string);
}

// testing
// testFunction(10000)
