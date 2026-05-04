// Skapar en array av frågor och svar
const question = [
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

// Hämtar elementen från HTML-dokumentet
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variabler för att hålla koll på nuvarande fråga och poäng
let currentQuestionIndex = 0;
let score = 0;

// Funktion som startar quizet från början
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Funktion som visar den nuvarande frågan och dess svarsalternativ
function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Funktion som återställer tillståndet inför nästa fråga
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Funktion som hanterar när användaren klickar på ett svar
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Funktion som visar den slutliga poängen
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Funktion som hanterar nästa-knappen
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Event listener för nästa-knappen
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Startar quizet när sidan laddas
startQuiz();