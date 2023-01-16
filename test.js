function testFunction (numOfRuns) {
    let errors = []
    for (let i = 0; i < numOfRuns; i++) {
        document.getElementById("pw-generator-btn").click()
        const pwOne = document.querySelector("#pw-output-one .pw-string").textContent
        const pwTwo = document.querySelector("#pw-output-two .pw-string").textContent
        
        
        if (pwOne.length != 15) {
            errors.push(new Error(i, pwOne.length, pwOne))
        }
        if (pwTwo.length != 15) {
            errors.push(new Error(i, pwTwo.length, pwTwo))
        }
    }
    console.log(errors)
}


function Error(runNumber, pwLength, pwString) {
    this.runNumber = runNumber;
    this.pwLength = pwLength;
    this.pwString = pwString;
}

export default testFunction

