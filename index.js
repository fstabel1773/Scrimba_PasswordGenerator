import characters from "./data.js"
import testFunction from "./test.js"

const settingsForm = document.querySelector("form")

document.addEventListener('click', (event) => {
    if (event.target.id === "pw-generator-btn") {
        event.preventDefault()

        const pwSettingsFormData = new FormData(settingsForm)
        const pwLength = parseInt(pwSettingsFormData.get("pw-setting-length"))

        let pwCharSet = []
        pwSettingsFormData.getAll("pw-setting-characters").forEach((charSetChoice) => {
            return pwCharSet.push(characters[charSetChoice])})
            pwCharSet = pwCharSet.flat()

        renderPw(pwLength, pwCharSet)

    } else if (event.target.classList.contains("copy-btn")) {
        copyPwToClipboard(event.target.parentElement.textContent.trim())
    } else if (event.target.classList.contains("hide-btn")) {
        event.target.previousElementSibling.classList.toggle("mask")
    }
})



function renderPw(pwLength, pwCharSet) {
    document.getElementById("pw-output-one").innerHTML = getPwHtml(pwLength, pwCharSet)
    document.getElementById("pw-output-two").innerHTML = getPwHtml(pwLength, pwCharSet)
}


function getPwHtml(pwLength, pwCharSet) {
    return `
        <span class="pw-string mask" >${generatePw(pwLength, pwCharSet)}</span>
        <i class="fa-regular fa-eye-slash hide-btn"></i>
        <i class="fa-regular fa-copy copy-btn"></i>
    `
}


function generatePw(pwLength, pwCharSet) {
    const pwArray = new Array(pwLength).fill("0").map((char) => {
        return pwCharSet[Math.floor(Math.random() * pwCharSet.length)]
    })
    return pwArray.join("")
}


function copyPwToClipboard(string) {
    navigator.clipboard.writeText(string)
}


// testing
// testFunction(10000)