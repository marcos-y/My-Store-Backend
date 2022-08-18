const express = require('express');
const router = express.Router();

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8001, function () {
    console.log('CORS-enabled web server listening on port 8002')
});

/* Users */
//get users list
const getUsers = (req, res, next) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "Users lists retrieved successfully"
        })
    })
}
router.get('/',  cors(), getUsers);



//get an user by ID
const getUser = (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM users WHERE id = ?'
    db.query(sql, [id], (err, results) => {
        //db.release();   // return the connection to pool
        //error(err, response);
        res.json({
            status: 200,
            message: results
        })
    })
}
router.get('/:id', cors(), getUser );



// create new user
const createUser = (req, res) => {
    let sql = `INSERT INTO users(firstName,lastName,email,phone,password,adress,city,zipCode,country,state) VALUES (?)`;
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,     
        req.body.phone,     
        req.body.password,  
        req.body.adress, 
        req.body.city,  
        req.body.zipCode,    
        req.body.country,    
        req.body.state ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New user added successfully"
        })
    })
}
router.post('/', cors(), createUser);



// Update user by ID
const updateUser = (req, res) => {
    const id = req.params.id;
    let sql = `UPDATE users SET firstName=?, lastName=?, email=?, phone=? ,password=?, adress=?, city=?, zipCode=?, country=?, state=? WHERE id=${id}`;
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,     
        req.body.phone,     
        req.body.password,  
        req.body.adress, 
        req.body.city,  
        req.body.zipCode,    
        req.body.country,    
        req.body.state ];
    db.query(sql, values, function (err, results, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "User updated successfully"
        })
    });
}
router.put('/:id', cors(), updateUser );




// delete user by ID
const deleteUser = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results, response) => {
        if (results.affectedRows == 0) {
            res.json({
                status: 400,
                message: "Resource not found"
            })
        }
        else {
            res.json({
                status: 200,
                message: `Resource deleted with id: ${id}`
            })
        }
    });
}
router.delete('/:id', cors(), deleteUser);

module.exports = router;