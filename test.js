function testFunction (numOfRuns) {
    let errors = []
    for (let i = 0; i < numOfRuns; i++) {
        // setting pw-length
        document.getElementById("pw-setting-length").removeAttribute("value")
        document.getElementById("pw-setting-length").setAttribute("value", Math.floor(Math.random() * 20))
        let targetPwLength = parseInt(document.getElementById("pw-setting-length").value)
        
        // simulate pw-genaration
        document.getElementById("pw-generator-btn").click()
        const pwOne = document.querySelector("#pw-output-one .pw-string").textContent
        const pwTwo = document.querySelector("#pw-output-two .pw-string").textContent
        
        // test pw-length
        if (pwOne.length != targetPwLength) {
            errors.push(new Error(i, pwOne.length, targetPwLength, pwOne))
        }
        if (pwTwo.length != targetPwLength) {
            errors.push(new Error(i, pwTwo.length, targetPwLength, pwTwo))
        }
    }
    console.log(errors)
}


function Error(runNumber, actualPwLength, targetPwLength, pwString) {
    this.runNumber = runNumber;
    this.actualPwLength = actualPwLength;
    this.targetPwLength = targetPwLength;
    this.pwString = pwString;
}

export default testFunction

