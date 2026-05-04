// Skapar en array av frågor och svar
const question = [
    {
        question:"What does 'Interdependence' mean?",
        answers:[
            {text:"A. Being completely independent from others", correct:false},
            {text:"B. A situation where things rely on each other", correct:true},
            {text:"C. Depending only on yourself", correct:false},
            {text:"D. Controlling others completely", correct:false},
        ]
    },
    {
         question:"What does 'Containerization' mean?",
        answers:[
            {text:"A. Packing goods into standardized containers for transport", correct:true},
            {text:"B. Producing goods locally in small batches", correct:false},
            {text:"C. Breaking goods into smaller pieces", correct:false},
            {text:"D. Storing items randomly without structure", correct:false},
        ]
    }, {
         question:"What does 'Globalization' mean?",
        answers:[
            {text:"A. The process of increasing global interconnectedness", correct:true},
            {text:"B. The act of becoming more localized", correct:false},
            {text:"C. The reduction of cultural differences", correct:false},
            {text:"D. The increase of local production", correct:false},
        ]
    }, {
         question:"What does 'Localization' mean?",
        answers:[
            {text:"A. The process of adapting products or services to meet the specific needs of a local market", correct:true},
            {text:"B. The process of expanding into new international markets", correct:false},
            {text:"C. The process of standardizing products or services for global distribution", correct:false},
            {text:"D. The process of reducing the size of a product or service", correct:false},
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Visar frågan och numret

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; // Visar texten på knappen
        button.classList.add("btn"); // Lägger till en klass för stylin
        answerButtons.appendChild(button); // Lägger till knappen i answerButtons-diven
        if(answer.correct){
            button.dataset.correct = answer.correct; // Lägger till en data-attribut för att markera rätt svar
        }
        button.addEventListener("click", selectAnswer); // Lägger till en event listener för att hantera när användaren klickar på ett svar
    });
}

// Funktion som återställer tillståndet inför nästa fråga
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);// Tar bort alla svarsknappar från föregående fråga
    }
}

// Funktion som hanterar när användaren klickar på ett svar
function selectAnswer(e){
    const selectedBtn = e.target; // Hämta den knapp som användaren klickade på
    const isCorrect = selectedBtn.dataset.correct === "true"; // Kolla om det valda svaret är korrekt
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => { // Gå igenom alla svarsknappar
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; // Inaktivera alla knappar efter att ett svar har valts
    });
    nextButton.style.display = "block"; // Visa nästa-knappen efter att ett svar har valts
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
        handleNextButton(); // Gå till nästa fråga
    }else{
        startQuiz(); // Starta om quizet
    }
});

// Startar quizet när sidan laddas
startQuiz();