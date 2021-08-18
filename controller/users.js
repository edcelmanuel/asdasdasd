const pool = require("./mydb")
const {isEmptyObject} = require("./functions")


const getAllUsers = (req, res) => {
    pool.getConnection((err, connection) =>{
        if (err) throw console.log(err);
        console.log(`connected as id ${connection.threadId}`);
    
        connection.query('SELECT * FROM users ', (err, rows) =>{
            connection.release();

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json(rows);
        });
    });
}

const insertUser = (req, res) => {
    pool.getConnection((err, connection) =>{
        if (err) throw console.log(err);
        console.log(`connected as id ${connection.threadId}`);

        const params = {
            user: req.body.user,
            pass: req.body.pass,
            name: req.body.name,
            type: req.body.type,
            picture: req.body.picture,
            access: JSON.stringify(req.body.access),
            added_by: req.body.added_by,
        };
        
        connection.query('INSERT INTO users SET ?', params, (err, rows) =>{
            connection.release();

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json({
                status: "success",
                message: `Username ${params.user} has been ADDED by ${params.added_by}.`
            });
        });

        console.log(req.body);
    });
}

const findUserByID = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err);
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * FROM users WHERE uid = ?', [req.params.uid], (err, rows) =>{
            connection.release();

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            
            // rows = rows.map(row => (row.access = JSON.parse(row.access), row));
            res.json(rows);
        });
    });
}


const updateUser = (req, res) => {
    pool.getConnection((err, connection) =>{
        if (err) throw console.log(err);
        console.log(`connected as id ${connection.threadId}`);

        const params = {
            user: req.body.user,
            pass: req.body.pass,
            name: req.body.name,
            type: req.body.type,
            picture: req.body.picture,
            access: JSON.stringify(req.body.access),
        };
        
        connection.query('UPDATE users SET ? WHERE uid = ?', [params, req.params.uid], (err, rows) =>{
            connection.release();

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json({
                status: "Success",
                message: `Username ${params.user} has been UPDATED.`
            });
        });

    });
}



module.exports = {findUserByID, getAllUsers, insertUser, updateUser}