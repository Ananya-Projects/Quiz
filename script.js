const questions = [
    {
        question: "Which HTML tag is used to define an internal stylesheet?",
        answers : [ 
            { text: "style", correct: true},
            { text: "script", correct: false},
            { text: "link", correct: false},
            { text: "css", correct: false}
        ]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers : [ 
            { text: "color", correct: false},
            { text: "bgcolor", correct: false},
            { text: "background-color", correct: true},
            { text: "background", correct: false}
        ]  
    },
    {
        question: "Which of the following is a correct JavaScript array declaration?",
        answers : [ 
            { text: "var arr = (1, 2, 3)", correct: false},
            { text: "var arr = {1, 2, 3}", correct: false},
            { text: "var arr = [1, 2, 3]", correct: true},
            { text: "var arr = (1; 2; 3)", correct: false}
        ]
    },
    {
        question: "What is the purpose of the 'position' property in CSS?",
        answers : [ 
            { text: "To define the stacking order of elements", correct: false},
            { text: "To control the layout of an element", correct: true},
            { text: "To define the color of an element", correct: false},
            { text: "To define the size of an element", correct: false}
        ]  
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers : [ 
            { text: "onchange", correct: false},
            { text: "onmouseover", correct: false},
            { text: "onclick", correct: true},
            { text: "onhover", correct: false}
        ]  
    },
    {
        question: "Which CSS selector is used to select an element with a specific ID?",
        answers : [ 
            { text: "#", correct: true},
            { text: ".", correct: false},
            { text: "*", correct: false},
            { text: ">", correct: false}
        ]  
    },
    {
        question: "Which method is used to access HTML elements using JavaScript?",
        answers : [ 
            { text: "getElementById()", correct: true},
            { text: "querySelector()", correct: false},
            { text: "getElementsByClass()", correct: false},
            { text: "getElementByTag()", correct: false}
        ]  
    },
    {
        question: "In CSS, how do you select elements with a specific class?",
        answers : [ 
            { text: "#classname", correct: false},
            { text: ".classname", correct: true},
            { text: "classname", correct: false},
            { text: "*classname", correct: false}
        ]
    },
    {
        question: "What is the default value of the `position` property in CSS?",
        answers : [ 
            { text: "relative", correct: false},
            { text: "fixed", correct: false},
            { text: "absolute", correct: false},
            { text: "static", correct: true}
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers : [ 
            { text: "font", correct: false},
            { text: "styles", correct: false},
            { text: "style", correct: true},
            { text: "class", correct: false}
        ]  
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
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
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
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

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score : ${score} / ${questions.length}`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();