


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
            name.textContent = topic;        // may need to change this depending on format of response
            library.append(shelf);
            return shelf;
        });
    } else {
    alert('Problem with request ' + response.statusText);
    };
};
fill_library()

