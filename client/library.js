

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
fill_library()
window.addEventListener("click", topicListHandler);

async function topicListHandler(e) {
    let item = e.target;

    if (item.classList[0] == "testButton") {  
        console.log("test")     ////

        let selectedTopic = item.closest('.shelf').id;
        // redirect to test page and set topic
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
        } else {
            alert('Problem with POST request ' + response.statusText);
        };
    } 
    else if (item.classList[0] == "deleteButton") {  
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
};
