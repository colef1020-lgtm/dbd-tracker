window.onload = function () {

const killers = [
"The Trapper",
"The Wraith",
"The Hillbilly",
"The Nurse",
"The Shape",
"The Hag",
"The Doctor",
"The Huntress",
"The Cannibal",
"The Nightmare",
"The Pig",
"The Clown",
"The Spirit",
"The Legion",
"The Plague",
"Ghost Face",
"The Demogorgon",
"The Oni",
"The Deathslinger",
"The Executioner",
"The Blight",
"The Twins",
"The Trickster",
"The Nemesis",
"The Cenobite",
"The Artist",
"The Onryō",
"The Dredge",
"The Mastermind",
"The Knight",
"The Skull Merchant",
"The Singularity",
"The Xenomorph",
"The Good Guy",
"The Unknown",
"The Lich",
"The Dark Lord",
"The Houndmaster",
"The Ghoul",
"The Animatronic",
"The Krasue",
"Jason Voorhees"
];

let data = JSON.parse(localStorage.getItem("dbdKillers")) || {};

killers.forEach(name => {
    if(!data[name]){
        data[name] = {
            owned:false,
            prestige:1
        };
    }
});

const grid = document.getElementById("killerGrid");
const search = document.getElementById("search");

function save(){
    localStorage.setItem("dbdKillers",JSON.stringify(data));
}

function draw(){

    grid.innerHTML="";

    let filter = search.value.toLowerCase();

    killers
    .filter(name=>name.toLowerCase().includes(filter))
    .forEach(name=>{

        const killer=data[name];

        const card=document.createElement("div");
        card.className="card";

        card.innerHTML=`
        <h2>${name}</h2>

        <button class="owned">
        ${killer.owned ? "Owned ✅":"Unlock"}
        </button>

        <p>Prestige</p>

        <div class="prestige">

        <button class="minus">-</button>

        <span>${killer.prestige}</span>

        <button class="plus">+</button>

        </div>
        `;

        card.querySelector(".owned").onclick=()=>{

            killer.owned=!killer.owned;

            save();

            draw();

        };

        card.querySelector(".minus").onclick=()=>{

            if(killer.prestige > 1){

    killer.prestige--;

    save();

    draw();

}

};

card.querySelector(".plus").onclick = ()=>{

    if(killer.prestige < 100){

        killer.prestige++;

        save();

        draw();

    }

};

grid.appendChild(card);

});

}

search.oninput = draw;
document.getElementById("randomBtn").onclick = function(){

    const ownedKillers = killers.filter(name => data[name].owned);

    if(ownedKillers.length === 0){
        document.getElementById("randomResult").textContent =
        "You don't own any killers!";
        return;
    }

    const random =
        ownedKillers[Math.floor(Math.random() * ownedKillers.length)];

    document.getElementById("randomResult").textContent =
    "🎲 " + random;

};
draw();

};