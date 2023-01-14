import characters from "./data.js"

document.addEventListener("click", (event) => {
    renderPw()
})


function renderPw() {
    document.getElementById("pw-output-one").textContent = generatePw()
    document.getElementById("pw-output-two").textContent = generatePw()
}

function generatePw() {
    const pwArray = new Array(15).fill("0").map((char) => {
        return characters[Math.floor(Math.random() * characters.length)]
    })
    console.log(pwArray.join(""))
    return pwArray.join("")
}


