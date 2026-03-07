
const searchButton = document.getElementById("btn");
const cardContainer = document.getElementById("topicTable");

const inputForm = document.getElementById("nav-search");
inputForm.addEventListener('submit', topicOptions);
async function topicOptions(e) {
    e.preventDefault();
    cardContainer.innerHTML = ''        // clear previous options
    const cardTemplate = document.getElementById("topicCardTemplate");
    let searchValue = new FormData(inputForm);
    searchValue = Object.fromEntries(searchValue.entries()).topic;
    const url = "/search/topics/" + searchValue;
    const response = await fetch(url);
    if (response.ok) {
        const topics = await response.json();
        const topicTable = topics.map(topic => {
            let card = cardTemplate.content.cloneNode(true).children[0];
            let name = card.querySelector('[topic-name-slot]');
            name.textContent = topic;
            cardContainer.append(card);
            return card;
        });
    } else {
    alert('Problem with request ' + response.statusText);
    };
};