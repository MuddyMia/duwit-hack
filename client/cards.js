

const cardHolder = document.getElementById("flashcardContainer");
let questions, answers, n;
let i = 0;

async function getQuestionsAndAnswers() {
    let url = '/test/questions';
    let response = await fetch(url);
    if (response.ok) {
        const responseJSON = await response.json();
        questions = responseJSON.questions;
        answers = responseJSON.answers;
        n = questions.length;
    } else {
        alert('Problem with request ' + response.statusText);
    };
};

const generationButton = document.getElementById("generateCardsButton");
generationButton.addEventListener("click", generateCards);
async function generateCards() {
    await getQuestionsAndAnswers();
    cardHolder.classList.remove('hide');        // for some reason doesn't let you click it again
    swapCards();
};

function swapCards() {
    const cardTemplate = document.getElementById("flashcardTemplate");
    console.log("i", i);
    console.log("n", n);
    if (i < n) {
        cardHolder.innerHTML = '';
        let card = cardTemplate.content.cloneNode(true).children[0];
        card = fillCard(card, questions[i], answers[i]);
        cardHolder.addEventListener("click", flashcardQuestion);
        i++;
    } else {
        cardHolder.classList.add("hide");
    };
};

function fillCard(card, q, a) {
    let question = card.querySelector('[question]');
    let answer = card.querySelector('[answer]');
    question.classList.remove('hide');
    answer.classList.add('hide');
    question.textContent = q;
    answer.textContent = a;
    cardHolder.append(card);
    return card;
};

function flashcardQuestion() {
    card = cardHolder.children[0];
    cardHolder.querySelector('[question]').classList.add('hide');
    card.querySelector('[answer]').classList.remove('hide');
    cardHolder.addEventListener("click", flashcardAnswer);
    cardHolder.removeEventListener("click", flashcardQuestion);
};

function flashcardAnswer() {
    cardHolder.removeEventListener("click", flashcardAnswer);
    swapCards();
};