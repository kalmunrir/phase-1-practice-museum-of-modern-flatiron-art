document.addEventListener(`DOMContentLoaded`, init);

function addDetailsOfFirstExhibitToPage (){
    fetch(`http://localhost:3000/current-exhibits`)
    .then(r => r.json())
    .then(exhibits => dispExhibit(exhibits[0]))
}

function dispExhibit(exhibitObj) {
    const title = document.querySelector(`#exhibit-title`);
        title.textContent = exhibitObj[`title`];
    const ticketsBought = document.querySelector(`#tickets-bought`);
        ticketsBought.textContent = exhibitObj[`tickets_bought`];
    const description = document.querySelector(`#exhibit-description`)
        description.textContent = exhibitObj[`description`];
    const img = document.querySelector(`#exhibit-image`)
        img.src = exhibitObj[`image`];
    exhibitObj[`comments`].forEach(comment => {
        const p = document.createElement(`p`);
            p.textContent = comment;
        document.querySelector(`#comments-section`).append(p);
    });

    document.querySelector(`#comment-form`).addEventListener(`submit`, (e) => {
        e.preventDefault();

        exhibitObj[`comments`][exhibitObj[`comments`].length] = e.target[`comment-input`].value;
        const p = document.createElement(`p`);
            p.textContent = e.target[`comment-input`].value;
        document.querySelector(`#comments-section`).append(p);

        fetch(`http://localhost:3000/current-exhibits/${exhibitObj[`id`]}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(exhibitObj)
        })
        .then(r => r.json())
        .then(exhibit => console.log(exhibit))
    })

    document.querySelector(`#buy-tickets-button`).addEventListener(`click`, () => {
        exhibitObj[`tickets_bought`]++;
        ticketsBought.textContent = exhibitObj[`tickets_bought`];

        fetch(`http://localhost:3000/current-exhibits/${exhibitObj[`id`]}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(exhibitObj)
        })
        .then(r => r.json())
        .then(exhibit => console.log(exhibit))
    })
}

function init() {
    addDetailsOfFirstExhibitToPage();
}
