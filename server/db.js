import pg from "pg";
import env from "dotenv";

env.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function getEntries(column, direction) {
    try {
        const result = await pool.query(`SELECT * FROM entries ORDER BY ${column} ${direction};`)
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error in db with code:' + error.code)
    }
}

async function addEntry(restaurant, r_rating, k_rating, price, comment) {
    try {
        const result = await pool.query(
            "INSERT INTO entries (restaurant, r_rating, k_rating, price, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [restaurant, r_rating, k_rating, price, comment]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Error in db with code: ' + error.code);
    }
}

async function editEntry(id, restaurant, r_rating, k_rating, price, comment) {
    try {
        const result = await pool.query(
            "UPDATE entries SET restaurant = $1, r_rating = $2, k_rating = $3, price = $4, comment = $5 WHERE id = $6 RETURNING *;",
            [restaurant, r_rating, k_rating, price, comment, id]);
        if (result.rowCount === 0) throw new Error(`No entry found with id ${ id } to update.`);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Error in db with code: ', error.code);
    }
}

async function deleteEntry(id) {
    try {
        const result = await pool.query("DELETE FROM entries WHERE id = $1", [id]);
        if (result.rowCount === 0) throw new Error(`No entry found with id ${id} to delete.`);
    } catch (error) {
        console.error(error);
        throw new Error('Error in db with code: ', error.code);
    }
    
}


export { getEntries, addEntry, editEntry, deleteEntry };