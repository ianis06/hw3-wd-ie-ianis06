let questions = [
    {
        question: "Do you feel happy?",
        options: {
            a: "Yes",
            b: "No"
        },
        correctAnswer: "a",
        correctResponse: "Super!",
        incorrectResponse: "I hope you will find something that makes you happy soon!"
    },
    {
        question: "What makes you happy?",
        options: {
            a: "Money.",
            b: "Family and friends"
        },
        correctAnswer: "b",
        correctResponse: "Super!",
        incorrectResponse: "Nope, gotcha!"
    },
    {
        question: "Can money make you happy?",
        options: {
            a: "It can, if your life is already in order.",
            b: "NOT AT ALL"
        },
        correctAnswer: "a",
        correctResponse: "Exactly!",
        incorrectResponse: "I don't think not beig able to pay your bills is a good way to be happy."
    },
    {
        question: "What would you do if you had a million dollars?",
        options: {
            a: "Buy things I couldn't afford before",
            b: "Spend it on experiences"
        },
        correctAnswer: "a",
        correctAnswer: "b",
        correctResponse: "Super!",
        incorrectResponse: "I am sorry"
    },
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");
displayQuestion();

function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = Object.keys(currentQuestion.options).map(key => `${key}. ${currentQuestion.options[key]}`).join(' ');

    let botResponse = document.createElement("div");
    botResponse.classList.add("message");
    botResponse.innerHTML = `<strong>...:</strong> ${currentQuestion.question} ${optionsHTML}`;
    chatContainer.appendChild(botResponse);
}

function scrollChatContainerToBottom() {
    let chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let userResponse = userInput.value.toLowerCase();

    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.innerHTML = `<strong>... :</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];
    let botResponse = document.createElement("div");
    botResponse.classList.add("message");
    botResponse.innerHTML = `<strong>... :</strong> `;
    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML += currentQuestion.correctResponse;
    } else {
        botResponse.innerHTML += currentQuestion.incorrectResponse;
    }
    chatContainer.appendChild(botResponse);

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    userInput.value = "";
    displayQuestion();

    scrollChatContainerToBottom();
});