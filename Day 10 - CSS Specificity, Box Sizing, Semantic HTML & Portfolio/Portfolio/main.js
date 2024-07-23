document.addEventListener("DOMContentLoaded", function () {

    const phrases = ["web developer...", "mentor...", "software consultant..", "youtuber.."];
    const dynamicTextElement = document.querySelector("#dynamic-text")

    let phraseIndex = 0;
    let letterIndex = 0;

    let writingSpeed = 150;
    let erasingSpeed = 50;

    function clearLetter() {
        let content = dynamicTextElement.textContent.split("");
        content.pop();
        dynamicTextElement.textContent = content.join("");
        if (dynamicTextElement.textContent != "") {
            setTimeout(function () {
                clearLetter();
            }, erasingSpeed)
        } else {
            phraseIndex++;
            phraseIndex = phraseIndex % phrases.length;
            letterIndex = 0;
            writeLetter();
        }

    }
    function writeLetter() {
        dynamicTextElement.textContent += phrases[phraseIndex].charAt(letterIndex);
        if (letterIndex < phrases[phraseIndex].length) {
            setTimeout(function () {
                letterIndex++;
                writeLetter()
            }, writingSpeed)

        } else {
            clearLetter();
        }

    }

    writeLetter();

})