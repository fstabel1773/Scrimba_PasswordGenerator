import characters from "./data.js"
import testFunction from "./test.js"

const settingsForm = document.querySelector("form")

document.addEventListener('click', (event) => {
    if (event.target.id === "pw-generator-btn") {
        event.preventDefault()
        const pwSettingsFormData = new FormData(settingsForm)
        const pwLength = parseInt(pwSettingsFormData.get("pw-setting-length"))
        renderPw(pwLength)

    } else if (event.target.classList.contains("copy-btn")) {
        copyPwToClipboard(event.target.parentElement.textContent.trim())
    } else if (event.target.classList.contains("hide-btn")) {
        event.target.previousElementSibling.classList.toggle("mask")
    }
})



function renderPw(pwLength) {
    document.getElementById("pw-output-one").innerHTML = getPwHtml(pwLength)
    document.getElementById("pw-output-two").innerHTML = getPwHtml(pwLength)
}


function getPwHtml(pwLength) {
    return `
        <span class="pw-string mask" >${generatePw(pwLength)}</span>
        <i class="fa-regular fa-eye-slash hide-btn"></i>
        <i class="fa-regular fa-copy copy-btn"></i>
    `
}


function generatePw(pwLength) {
    const pwArray = new Array(pwLength).fill("0").map((char) => {
        return characters[Math.floor(Math.random() * characters.length)]
    })
    return pwArray.join("")
}


function copyPwToClipboard(string) {
    navigator.clipboard.writeText(string)
}


// testing
testFunction(10000)