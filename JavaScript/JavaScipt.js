const questions = [
    {
        question:"What does '...' mean in English?",
        answers:[
            {text:"Hello", correct:false},
            {text:"Goodbye", correct:false},
            {text:"Please", correct:true},
            {text:"Thank you", correct:false},
        ]
    },
    {
         question:"What does '...' mean in English?",
        answers:[
            {text:"Hello", correct:true},
            {text:"Goodbye", correct:false},
            {text:"Please", correct:false},
            {text:"Thank you", correct:false},
        ]
    }, {
         question:"What does '...' mean in English?",
        answers:[
            {text:"Hello", correct:false},
            {text:"Goodbye", correct:true},
            {text:"Please", correct:false},
            {text:"Thank you", correct:false},
        ]
    }, {
         question:"What does '...' mean in English?",
        answers:[
            {text:"Hello", correct:false},
            {text:"Goodbye", correct:false},
            {text:"Please", correct:false},
            {text:"Thank you", correct:true},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
startQuiz();