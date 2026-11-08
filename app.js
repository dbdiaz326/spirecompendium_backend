const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let heroes = [
    {
        "_id": 1,
        "name": "The Ironclad",
        "description": "Uses strength and can heal by taking damage",
        "emoji": "⚔️",
        "color": "ironclad-color",
        "link": "/ironclad",
        "main_image": "ironclad-image.png"
    },
    {
        "_id": 2,
        "name": "The Silent",
        "description": "Uses poison and many small attacks",
        "emoji": "🧪",
        "color": "silent-color",
        "link": "/silent",
        "main_image": "silent-image.png"
    },
    {
        "_id": 3,
        "name": "The Defect",
        "description": "Uses orbs for damage and defense",
        "emoji": "⚡",
        "color": "defect-color",
        "link": "/defect",
        "main_image": "defect-image.png"
    },
    {
        "_id": 4,
        "name": "The Watcher",
        "description": "Switches stances to deal more damage",
        "emoji": "☯️",
        "color": "watcher-color",
        "link": "/watcher",
        "main_image": "watcher-image.png"
    }
];

app.get("/api/heroes", (req,res)=>{
    res.send(heroes);
});

//listen for incoming requests
app.listen(port, ()=>{
    console.log("Server is up and running");
});