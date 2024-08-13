// take the references of elements 

const quizContainer = document.getElementsByClassName('quiz-container')[0];
const quiz = document.getElementsByClassName('quiz')[0];
const previousButton = document.getElementsByClassName('previous-btn')[0];
const nextButton = document.getElementsByClassName('next-btn')[0];
const submitButton = document.getElementsByClassName('submit-btn')[0];


// data
const questions = [
    {
        id: 1,
        question: "Who is the creator of JavaScript?",
        answers: {
            a: "Me",
            b: "You",
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        id: 2,
        question: "Which one is the programming language?",
        answers: {
            a: "HTML",
            b: "JavaScript",
            c: "CSS"
        },
        correctAnswer: "b"
    },
    {
        id: 3,
        question: "What is the purpose of a programming language?",
        answers: {
            a: "To scare people",
            b: "To scare computer",
            c: "To enhance the capability of a current system"
        },
        correctAnswer: "c"
    }
];

const quizSlides = [];
let currentSlide = 0;
let quizSubmitted = false;
const answeredByUser = [];

function onNextClick() {
    const upcomingSlideNumber = currentSlide + 1;
    if (upcomingSlideNumber >= questions.length) {
        return;
    } else {
        showSlide(upcomingSlideNumber);
    }
}

function onPreviousClick() {
    const upcomingSlideNumber = currentSlide - 1;
    if (upcomingSlideNumber < 0) {
        return;
    } else {
        showSlide(upcomingSlideNumber);
    }
}

function onSubmitClick() {
    quizSubmitted = true;
    const resultsElement = quizContainer.querySelector('.results');
    const correctAnswers = answeredByUser.filter(i => i.isCorrect == true);

    const displayText = `${correctAnswers.length} of ${questions.length} are correct.`;
    resultsElement.innerText = displayText;

    enableSubmitButton(false);
    disableAnswers();
}

function regulateNextPrevEnability() {
    if (currentSlide <= 0) {
        previousButton.setAttribute('disabled', 'disabled');
    } else {
        previousButton.removeAttribute('disabled');
    }

    if (currentSlide >= quizSlides.length - 1) {
        nextButton.setAttribute('disabled', 'disabled');
    } else {
        nextButton.removeAttribute('disabled');
    }
}

function enableSubmitButton(enable) {
    if (enable) {
        submitButton.removeAttribute('disabled');   // enabling.
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}

function buildQuiz() {
    questions.forEach(function (question, index) {
        const slideElement = document.createElement('div');
        slideElement.setAttribute('class', 'slide');

        const questionElement = document.createElement('div');
        questionElement.setAttribute('class', 'question');
        questionElement.innerText = question.question;

        slideElement.appendChild(questionElement);

        const answersElement = document.createElement('div');
        answersElement.setAttribute('class', 'answers');
        for (const letter in question.answers) {
            const answerElement = document.createElement('div');
            answerElement.setAttribute('class', 'answer');

            const inputOptionElement = document.createElement('input');
            inputOptionElement.setAttribute('type', 'radio');
            inputOptionElement.setAttribute('name', `question${question.id}`);
            inputOptionElement.setAttribute('id', letter);
            inputOptionElement.setAttribute('value', question.answers[letter]);
            inputOptionElement.setAttribute('onclick', 'onAnswerClick(event)');

            answerElement.appendChild(inputOptionElement);

            const spanElement = document.createElement('span');
            spanElement.innerText = question.answers[letter];

            answerElement.appendChild(spanElement);
            answersElement.appendChild(answerElement);
        }

        slideElement.appendChild(answersElement);

        quizSlides.push(slideElement);
    });
}

function onAnswerClick(ev) {
    const questionId = ev.target.name.match(/(?<=question).*/gi)[0];

    const existingAnswer = answeredByUser.find(i => i.questionId == questionId);

    const answeredObj = existingAnswer ?? { questionId: questionId };
    answeredObj.answerChosen = ev.target.id;

    markCorrect(answeredObj);
    if (!existingAnswer) {
        answeredByUser.push(answeredObj);
    }

    if (questions.length == answeredByUser.length) {
        enableSubmitButton(true);
    }
}

function markCorrect(answeredObj) {
    const question = questions.find(i => i.id == answeredObj.questionId);

    if (question.correctAnswer == answeredObj.answerChosen) {
        answeredObj.isCorrect = true;
    } else {
        answeredObj.isCorrect = false;
    }
}

function showSlide(slideNumber) {
    quiz.innerHTML = '';    // making quiz empty

    const slide = quizSlides[slideNumber];
    quiz.appendChild(slide);    // make it part of quiz.

    currentSlide = slideNumber;

    regulateNextPrevEnability();

    if (quizSubmitted) {
        disableAnswers();
    }
}

function disableAnswers() {
    const slide = quizSlides[currentSlide];
    const allTheAnswers = slide.querySelectorAll("input[type=radio]");

    for (let i = 0; i < allTheAnswers.length; i++) {
        const element = allTheAnswers[i];

        element.setAttribute('disabled', 'disabled');
    }

}

function initialize() {
    currentSlide = 0;
    buildQuiz();
    showSlide(0);

    enableSubmitButton(false);
}


// start the show.
initialize();

