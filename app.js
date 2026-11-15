const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

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

app.post("/api/heroes", upload.single("img"), (req,res)=>{
    const result = validateHero(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    if(!req.file){
        res.status(400).send("Select an image");
        return;
    }

    const hero = {
        _id:heroes.length+1,
        name:req.body.name,
        description:req.body.description,
        emoji:req.body.emoji,
        color:req.body.color,
        main_image:req.file.filename
    };

    heroes.push(hero);

    res.status(200).send(hero);
});

const validateHero = (hero) => {
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        description:Joi.string().min(3).required(),
        emoji:Joi.string().required(),
        color:Joi.string().valid(
            "ironclad-color",
            "silent-color",
            "defect-color",
            "watcher-color"
        ).required()
    });

    return schema.validate(hero);
};

//listen for incoming requests
app.listen(port, ()=>{
    console.log("Server is up and running");
});