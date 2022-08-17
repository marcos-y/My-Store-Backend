const express = require('express');
const router = express.Router();

/* Users */
//get users list
router.get('/', (req, res, next) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Users lists retrieved successfully"
        })
    })
});

//get an user by ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM users WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            //db.release();   // return the connection to pool
            //error(err, response);
            res.json({
                status: 200,
                message: results
            })
    })
});

// create new user
router.post('/', function (req, res) {
    let sql = `INSERT INTO users(firstName,lastName,email,phone,password) VALUES (?)`;
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.body.password,
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New user added successfully"
        })
    })
});

// Update user by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    let sql = `UPDATE users SET firstName=?, lastName=?, email=?, phone=? ,password=? WHERE id=${id}`;
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.body.password,
    ];
    db.query( sql, values , function (err, results, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "User updated successfully"
        })
    });
})


// delete user by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results, response) => {
        if (results.affectedRows == 0)
        {
            res.json({
                status: 400,
                message: "Resource not found"
            })
        }
        else
        {
            res.json({
                status: 200,
                message: `Resource deleted with id: ${id}`
            })
        }
    });
})

module.exports = router;