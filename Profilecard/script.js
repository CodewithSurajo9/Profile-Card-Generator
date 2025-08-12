const form = document.querySelector("form");
const fileInput = form.querySelector('input[type="file"]');
const nameInput = form.querySelector('input[name="name"]');
const occupationInput = form.querySelector('input[name="occupation"]');
const infoTextarea = form.querySelector('textarea[name="info"]');
const main = document.querySelector("#main");

const btn = document.getElementById("btn");
const fileinp = document.getElementById("fileinp");
const fileName = document.getElementById("fileName");


function saveCards(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}


function loadCards() {
    return JSON.parse(localStorage.getItem('cards') || '[]');
}

function renderCards() {
    
    document.querySelectorAll('.card').forEach(card => card.remove());
    const cards = loadCards();
    cards.forEach((data, idx) => {
        addCardToDOM(data, idx);
    });
}


function addCardToDOM(data, idx) {
    let card = document.createElement("div");
    card.classList.add("card");

    let profile = document.createElement("div");
    profile.classList.add("profile");

    let img = document.createElement("img");
    img.setAttribute("src", data.profilePic);

    let h3 = document.createElement("h3");
    h3.textContent = data.name;
    let h5 = document.createElement("h5");
    h5.textContent = data.occupation;
    let p = document.createElement("p");
    p.textContent = data.info;

    // Edit button
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'card-btn edit-btn';
    editBtn.onclick = function() {
        nameInput.value = data.name;
        occupationInput.value = data.occupation;
        infoTextarea.value = data.info;

        alert('To edit the image, please re-upload it.');
        
        const cards = loadCards();
        cards.splice(idx, 1);
        saveCards(cards);
        renderCards();
    };

    // Delete button
    let delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'card-btn del-btn';
    delBtn.onclick = function() {
        const cards = loadCards();
        cards.splice(idx, 1);
        saveCards(cards);
        renderCards();
    };

    profile.appendChild(img);
    card.appendChild(profile);
    card.appendChild(h3);
    card.appendChild(h5);
    card.appendChild(p);
    card.appendChild(editBtn);
    card.appendChild(delBtn);

    main.appendChild(card);
}


form.addEventListener("submit", function(e){
    e.preventDefault();

    let reader = new FileReader();
    let file = fileInput.files[0];
    let cards = loadCards();

    function addCard(profilePicUrl) {
        const data = {
            profilePic: profilePicUrl,
            name: nameInput.value,
            occupation: occupationInput.value,
            info: infoTextarea.value
        };
        cards.push(data);
        saveCards(cards);
        renderCards();
        form.reset();
    }

    if (file) {
        reader.onload = function(evt) {
            addCard(evt.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        addCard('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAACUCAMAAADifZgIAAAAM1BMVEXk5ueutLff4uOorrLn6eqrsbTb3t/Jzc+xt7rq7O3R1NbM0NK8wcO2vL7V2NrY29zDx8nMlqZPAAAEPUlEQVR4nO2c25arIAxAFcJVUP7/aw/qtD2ddiqXSOha7qd53JMVQgTSYbi4uLi4uLi4uLi4uLj4cgAMALVEOqsqk3ZSIShrJVv/AWqnI4Atk/OCc7HCOR99sEvX4mCk8lqI8QkhtAuyW20jnR5/Kd/ER8cMtd9bpOfvjG/i3DFqwxeAKf42zP8HXLG+8gSsP3DevP3cU5qYcKy8ozrSdp8y+ol+slumZMcjS/pIbpYjvWoPPWjrLOlNmx6d57xpk+e2y4z0ph1onUEVSEftiTS1ZZF0LICkOVLmHNF0wYZQGOqYI4pKG5biUMdgU3XcUFI/HsEmkrYVoY5IGu2aUK9FmyRFZF2oR0EhXbjBPOAkW01yT/0n7a1hqbeem2uburW40X49QrUzRaNdsy/e0EvjYFdXkA3b2tohSLff1T2GdWjcZksM67HxByQs+R+5HVjPKNaN+z6wKNZiaWs9YRS+kbe2xpBub40T6/krra8MSbDGqXyta8h31uuv3BsHhtI9Nb+kwen5Gksj9detvwpQSl/rb5mBIUi3P1f9zm90U37ifofg5F3Wnz213Rk36lNEE7wEqG77aM5UZe2mTuAcqVuPRBcztR0U0UVpxXUj3R1Y3f5I924BVHHNprz/N7kvWu7SjvLVVnH1I32zUHq/27xF/aVd9BaHrH5UaBPdRT+T9zAu9h/Er55+yIu2cNS+OyxHuxfpvK2d7OXQK0albTdCE5e8Z0CmZIlw3Y0X2OO37pba8RWA8DlNgukt0Bsgg/89dnILs+9tpuABALNh/J0pgutgu3XegIEtap1NuuPDwrp4J34AGANynq21MxtMn9n8AuyYyP4XtdBnVlNgcpntNKmdabLzvGwR71B+jaycJ+d15KWEaO1dsBI6ypZtntEGHRfep3K9jg0KpxY20C/NtWRs84xp7VNUH52aJeW8Ixg2hdd5xmN175Qk8jYwr+OMZdMQo/ZqIDhcYOFzHh+bc9+2mwI2ubIgP8O1kq3WJjD1R5OUj9ChyRPbw4Y0GyfPTnAYprpsfgd3pz5diPmMHOcdMZ44+R1L3RnOm7eezlmWMIT3w+ZI+DPSG+ZTnSMc/cxyHTc/13lc79VxL3vTjjvqtTXmvYfBeI6f5o138wHT+dlx19ZY1ghvKjK0PU7pbiq9RhtBG2OaJ5f6DYdAehS10W6cHj/ounYKZZYnn6pfBwBLI70uyeK6jTEMWKxdfCfJcF4rF2qX3uBQlI8HZQN5dEm9U3YxWTsCXU3Jy7mqR01IZJc/yvpxQ4Tc8mdQJgFrydzZa39DAQfhMjObturdyKt+8YO8CzLHJTooIBtZXRTpXv4/POeI29KXvR3h0xO7hx3mB54eauhGOqZIcrARBh3QSD7WwfkNBSxSY20wZrzQSK19hlr0ieTbJmrRJ1K77GYnqEkkfvaC5T2R2vcxyXrijeE/lDY9niqNKsQAAAAASUVORK5CYII=');
    }
});

btn.addEventListener("click", function() {
    fileinp.click();
});

fileinp.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        btn.textContent = "Selected: " + file.name;
        fileName.textContent = file.name;
    } else {
        btn.textContent = "Upload Profile Picture";
        fileName.textContent = "";
    }
});

const style = document.createElement('style');

document.head.appendChild(style);
renderCards();