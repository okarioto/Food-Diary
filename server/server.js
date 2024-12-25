import express from "express";
import pool from "./db.js"

const app = express();
const port = 3000;


app.use(express.json());

app.get("/", (req, res) => {
    res.send('Server is running!');;
});

//Create API endpoints for funtions


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});