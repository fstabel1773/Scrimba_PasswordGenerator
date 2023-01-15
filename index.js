import characters from "./data.js"

document.addEventListener('click', (event) => {
    if (event.target.id === "pw-generator-btn") {
        renderPw()
    } else if (event.target.classList.contains("copy-btn")) {
        copyPwToClipboard(event.target.parentElement.textContent.trim())
    }
})



function renderPw() {
    document.getElementById("pw-output-one").innerHTML = getPwHtml()
    document.getElementById("pw-output-two").innerHTML = getPwHtml()
}


function getPwHtml() {
    return `
        <span class="pw-text">${generatePw()}</span><i class="fa-regular fa-copy copy-btn"></i>
    `
}


function generatePw() {
    const pwArray = new Array(15).fill("0").map((char) => {
        return characters[Math.floor(Math.random() * characters.length)]
    })
    return pwArray.join("")
}


function copyPwToClipboard(string) {
    navigator.clipboard.writeText(string)
}
