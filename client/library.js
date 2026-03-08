

// filling the library
async function fill_library() {
    const library = document.getElementById('libraryContainer')
    const shelfTemplate = document.getElementById('libraryTopic');

    let response = await fetch('/library/topics');  // request for the library items
    if (response.ok) {
        const libraryTopics = await response.json();

        const shelves = libraryTopics.map(topic => {
            let shelf = shelfTemplate.content.cloneNode(true).children[0];
            let name = shelf.querySelector('[topic-name-slot]');
            name.textContent = topic.name;        // may need to change this depending on format of response
            shelf.id = topic.id;
            library.append(shelf);
            return shelf;
        });
    } else {
    alert('Problem with request ' + response.statusText);
    };
};

function fill_library_subs(subs) {
    const library = document.getElementById('libraryContainer')
    library.innerHTML = ''
    const shelfTemplate = document.getElementById('librarySubTopic');
    const shelves = subs.map(topic => {
        //console.log("name", topic.name, "id", topic.id);            ///

        let shelf = shelfTemplate.content.cloneNode(true).children[0];
        let name = shelf.querySelector('[topic-name-slot]');
        name.textContent = topic.name;        // may need to change this depending on format of response
        shelf.id = topic.id;
        library.append(shelf);
        return shelf;
    });
    return shelves;
};

// test sub-options
async function topicListHandler(e) {
    console.log("TOPIC FUNCTION");        ///
    let item = e.target;
    
    if (item.classList[0] == "testButton") {        // open sub-topics
        console.log("test")     ////

        let selectedTopic = item.closest('.shelf').id;
        // set topic and show sub-topic options
        let request = {"id":selectedTopic};
        const response = await fetch('/test', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        });
        if (response.ok) {
            console.log("post successful");
            // filling library with subtopics
            const subtopics = await response.json();
            fill_library_subs(subtopics);
            
            window.removeEventListener("click", topicListHandler);
            window.addEventListener("click", subTopics);

        } else {
            alert('Problem with POST request ' + response.statusText);
        };
    } else if (item.classList[0] == "deleteButton") {  
        let selectedTopic;

        console.log("delete")     ////

        selectedTopic = item.closest('.shelf');
        // delete from library
        let request = {"id":selectedTopic.id};
        const response = await fetch('/library/remove', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        });
        if (response.ok) {
            // now remove it from the library
            selectedTopic.classList.add('hide');
        } else {
            alert('Problem with POST request ' + response.statusText);
        };
    };
}

fill_library()
window.addEventListener("click", topicListHandler);

async function subTopics(e) {
    console.log("SUBTOPIC FUNCTION");        ///

    //window.removeEventListener("click", subTopics);

    let item = e.target;
    if (item.classList[0] == "testButton") {  
        console.log("test")     ////

        let selectedTopic = item.closest('.shelf').id;
        // redirect to test page and set topic
        let request = {"id":selectedTopic};
        //console.log("request:", request);           ////
        const response = await fetch('/test/subtopic', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        });
        if (response.ok) {
            console.log("post successful");
            //<a href="cards.html"></a>
            window.location.replace('cards.html')
        } else {
            alert('Problem with POST request ' + response.statusText);
        };
    }; 
    
};


