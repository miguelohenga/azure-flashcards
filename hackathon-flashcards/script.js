// ===== 1. Data (Write your own questions!) =====
const flashcards = [
    {
        question: "What is the primary purpose of Azure Resource Manager (ARM)?",
        answer: "To deploy, manage, and monitor resources as a group."
    },
    {
        question: "Which Azure service is best for storing unstructured data like images?",
        answer: "Azure Blob Storage."
    },
    {
        question: "What does a Virtual Network (VNet) allow you to do?",
        answer: "Isolate and securely connect Azure resources."
    },
    {
        question: "What is the difference between vertical and horizontal scaling?",
        answer: "Vertical increases resources (CPU/RAM) of a single machine; horizontal adds more machines."
    },
    {
        question: "What is Azure Active Directory (Entra ID) used for?",
        answer: "Identity and access management."
    }
];

// ===== 2. State =====
let currentIndex = 0;
let isFlipped = false;

// ===== 3. Select Elements =====
const flashcardContainer = document.querySelector("#flashcard");
const questionText = document.querySelector("#question-text");
const answerText = document.querySelector("#answer-text");
const progressText = document.querySelector("#progress-text");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");

// ===== 4. Render Function =====
function renderCard() {
    const currentCard = flashcards[currentIndex];
    
    // Update text
    questionText.textContent = currentCard.question;
    answerText.textContent = currentCard.answer;
    progressText.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;

    // Reset flip state
    isFlipped = false;
    flashcardContainer.classList.remove("flipped");

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === flashcards.length - 1;
}

// ===== 5. Event Listeners =====
// Flip on click
flashcardContainer.addEventListener("click", () => {
    isFlipped = !isFlipped;
    flashcardContainer.classList.toggle("flipped");
});

// Next button
nextBtn.addEventListener("click", () => {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        renderCard();
    }
});

// Previous button
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderCard();
    }
});

// Shuffle button
shuffleBtn.addEventListener("click", () => {
    // Fisher-Yates shuffle algorithm
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentIndex = 0;
    renderCard();
});

// ===== 6. Initialize =====
renderCard();