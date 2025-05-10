
// Quiz questions
const quizQuestions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "HyperText Markup Language",
        "HyperText Marketing Language",
        "Hyper Transfer Markup Language"
      ],
      correctAnswer: 1
    },
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1
    },
    {
      question: "Which property in CSS is used to change text color?",
      options: ["font-color", "text-color", "color", "background-color"],
      correctAnswer: 2
    },
    {
      question: "What does the 'flex' property in CSS help with?",
      options: [
        "Creating responsive images",
        "Making fonts bold",
        "Aligning items in a container",
        "Adding shadows to boxes"
      ],
      correctAnswer: 2
    },
    {
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "append()"],
      correctAnswer: 0
    },
    {
      question: "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["var", "let", "const", "define"],
      correctAnswer: 2
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Digital Ordinance Model",
        "Desktop Object Management"
      ],
      correctAnswer: 0
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["<!-- -->", "//", "/* */", "**"],
      correctAnswer: 1
    },
    {
      question: "How do you select an element with the ID 'main' in CSS?",
      options: [".main", "#main", "main", "$main"],
      correctAnswer: 1
    },
    {
      question: "Which tag is used to embed JavaScript in an HTML page?",
      options: ["<javascript>", "<script>", "<js>", "<code>"],
      correctAnswer: 1
    }
  ];
  

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = Array(quizQuestions.length).fill(null);
let timerInterval;
let startTime;

// DOM elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const timerSpan = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const scoreText = document.getElementById('score-text');
const timeTaken = document.getElementById('time-taken');
const restartButton = document.getElementById('restart-btn');

// Initialize quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    
    showQuestion(currentQuestionIndex);
    startTimer();
    
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

// Display current question
function showQuestion(index) {
    const question = quizQuestions[index];
    
    // Update question number
    currentQuestionSpan.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    
    // Display question text
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        
        // If this question has been answered
        if (userAnswers[index] !== null) {
            if (i === userAnswers[index]) {
                optionElement.classList.add('selected');
                
                // Add correct/incorrect classes for feedback
                if (i === question.correctAnswer) {
                    optionElement.classList.add('correct');
                } else {
                    optionElement.classList.add('incorrect');
                }
            } else if (i === question.correctAnswer) {
                // Always show the correct answer
                optionElement.classList.add('correct');
            }
        } else {
            // Add click event if not answered yet
            optionElement.addEventListener('click', () => selectOption(i));
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update buttons state
    prevButton.disabled = index === 0;
    
    if (userAnswers[index] !== null) {
        // This question is answered, enable Next
        nextButton.disabled = false;
        feedbackElement.textContent = userAnswers[index] === question.correctAnswer 
            ? "Correct! Well done!" 
            : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
    } else {
        // Waiting for user to select
        nextButton.disabled = true;
        feedbackElement.textContent = '';
    }
    
    // Change Next to Finish on last question
    if (index === quizQuestions.length - 1) {
        nextButton.textContent = 'Finish Quiz';
    } else {
        nextButton.textContent = 'Next';
    }
}

// Handle option selection
function selectOption(optionIndex) {
    // Save user answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Check if answer is correct
    const correctAnswerIndex = quizQuestions[currentQuestionIndex].correctAnswer;
    
    if (optionIndex === correctAnswerIndex) {
        score++;
        feedbackElement.textContent = "Correct! Well done!";
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${quizQuestions[currentQuestionIndex].options[correctAnswerIndex]}`;
    }
    
    // Highlight options
    const options = optionsContainer.querySelectorAll('.option');
    
    options.forEach((option, i) => {
        // Remove event listeners
        option.replaceWith(option.cloneNode(true));
        
        if (i === optionIndex) {
            option.classList.add('selected');
            if (optionIndex === correctAnswerIndex) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        } else if (i === correctAnswerIndex) {
            option.classList.add('correct');
        }
    });
    
    // Enable next button
    nextButton.disabled = false;
}

// Navigation functions
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        // Last question, end quiz
        endQuiz();
    }
}

// Timer functions
function startTimer() {
    startTime = new Date();
    
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - startTime);
        const minutes = String(elapsedTime.getMinutes()).padStart(2, '0');
        const seconds = String(elapsedTime.getSeconds()).padStart(2, '0');
        
        timerSpan.textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// End quiz and show results
function endQuiz() {
    stopTimer();
    
    const endTime = new Date();
    const elapsedTime = new Date(endTime - startTime);
    const minutes = elapsedTime.getMinutes();
    const seconds = elapsedTime.getSeconds();
    
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    scoreText.textContent = `Your Score: ${score} out of ${quizQuestions.length}`;
    timeTaken.textContent = `Time Taken: ${minutes} minutes and ${seconds} seconds`;
}

// Event listeners
prevButton.addEventListener('click', goToPreviousQuestion);
nextButton.addEventListener('click', goToNextQuestion);
restartButton.addEventListener('click', initializeQuiz);

// Start the quiz
initializeQuiz();
