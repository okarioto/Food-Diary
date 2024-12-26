import express from "express";
import cors from 'cors';
import { getEntries, addEntry, editEntry, deleteEntry} from "./db.js";

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function validateString(string) {
    return (typeof string === 'string') && (!string.includes(';')) && (!string.includes('{'));
}

function validateRating(rating) {
    parseInt(rating)
    return (!Number.isNaN(rating)) && (rating >= 0) && (rating <= 10)
}


app.get("/", (req, res) => {
    res.send('Server is running!');
});

//Create API endpoints for functions

//Get all entries
app.get("/entries", async (req, res) => {
    const { column = 'id', direction = 'ASC' } = req.query;
    const validColumns = ['id', 'restaurant', 'r_rating', 'k_rating', 'price', 'comment']
    const validDirections = ['ASC', 'DESC']

    if (!validColumns.includes(column) || !validDirections.includes(direction)) {
        return res.status(400).send('Invalid column or direction');
    }

    try {
        const result = await getEntries(column, direction);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

//Insert new entry
app.post("/entries", async (req, res) => {
    const { restaurant, r_rating, k_rating, price, comment } = req.body;

    if (!validateString(restaurant)) {
        return res.status(400).send('Invalid restaurant name');
    }
    if (!validateRating(r_rating)) {
        return res.status(400).send('Invalid r_rating');
    }
    if (!validateRating(k_rating)) {
        return res.status(400).send('Invalid k_rating');
    }
    if (!validateString(price) || price.length > 10) {
        return res.status(400).send('Invalid price');
    }
    if (!validateString(comment)) {
        return res.status(400).send('Invalid comment');
    }

    try {
        const result = await addEntry(restaurant, r_rating, k_rating, price, comment);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

//Edit an entry
app.put("/entries", async (req, res) => {
    const { id, restaurant, r_rating, k_rating, price, comment } = req.body;

    if (typeof id !== 'number') {
        return res.status(400).send('Invalid id');
    }
    if (!validateString(restaurant)) {
        return res.status(400).send('Invalid restaurant name');
    }
    if (!validateRating(r_rating)) {
        return res.status(400).send('Invalid r_rating');
    }
    if (!validateRating(k_rating)) {
        return res.status(400).send('Invalid k_rating');
    }
    if (typeof price !== 'number' || price.length > 10) {
        return res.status(400).send('Invalid price');
    }
    if (!validateString(comment)) {
        return res.status(400).send('Invalid comment');
    }

    try {
        const result = await editEntry(id, restaurant, r_rating, k_rating, price, comment);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

//Delete an entry
app.delete("/entries/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    try {
        const result = await deleteEntry(id);
        res.status(200).send("deleted succesfully");
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});