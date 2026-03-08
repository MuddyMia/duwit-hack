
const searchButton = document.getElementById("btn");
const cardContainer = document.getElementById("topicTable");

const inputForm = document.getElementById("nav-search");
inputForm.addEventListener('submit', topicOptions);
async function topicOptions(e) {
    e.preventDefault();

    console.log("searching");           ///

    cardContainer.innerHTML = ''        // clear previous options
    const cardTemplate = document.getElementById("topicCardTemplate");
    let searchValue = new FormData(inputForm);
    searchValue = Object.fromEntries(searchValue.entries()).topic;

    if (!searchValue) {         // for when its just empty or a space
        searchValue = "§";
    } else if (searchValue==" ") {
        searchValue = "§§";
    };

    const url = "/search/topics/" + searchValue;            
    const response = await fetch(url);
    if (response.ok) {
        const topics = await response.json();
        const topicTable = topics.map(topic => {
            let card = cardTemplate.content.cloneNode(true).children[0];
            let name = card.querySelector('[topic-name-slot]');
            name.textContent = topic.name;
            card.id = topic.id;
            cardContainer.append(card);
            return card;
        });
        window.addEventListener("click", topicListHandler);
    } else {
    alert('Problem with request' , response.statusText);
    };
};

async function topicListHandler(e) {
    window.removeEventListener("click", topicListHandler);
    let item = e.target;
    if (item.classList[0] !== "topicCardButton") {  
        return      // button not pressed
    };
    // otherwise, find which button was pressed
    let selectedTopic = item.closest('.card').id;
    let request = {"id": selectedTopic};
    const response = await fetch('/library/new', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
    });
    if (response.ok) {
        console.log("post successful");
        
        let card = item.closest('.card');       // need to remove it from list
        card.classList.add("hide");
    } else {
        alert('Problem with POST request ' + response.statusText);
    };
};

const car = document.querySelector(".car-img");
const container = document.getElementById("carAnimation");

car.addEventListener("animationend", () => {
    container.remove();   // deletes the whole animation from the page
});