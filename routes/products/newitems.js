const express = require('express');
const router = express.Router();

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8004, function () {
    console.log('CORS-enabled web server listening on port 8005')
});


/* New Items */
//get new items list
const getNewItems = (req, res, next) => {
    let sql = `SELECT * FROM newitems`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "New items lists retrieved successfully"
        })
    })
};
router.get('/newitems', cors(), getNewItems);



//get a new item by ID
const getNewItem = (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM newitems WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            res.json({
                status: 200,
                message: results
            })
    })
}
router.get('/newitems/:id',cors(), getNewItem );


//create new item
const createNewItem = ((req, res) => {
    let sql = `INSERT INTO newitems(title,image,price,type,description,spec1,spec2,spec3,spec4,spec5) VALUES (?)`;
    let values = [
      req.body.title,
      req.body.image,
      req.body.price,
      req.body.type,
      req.body.description,
      req.body.spec1,
      req.body.spec2,
      req.body.spec3,
      req.body.spec4,
      req.body.spec5,
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "New item added successfully"
      })
    })
  });
router.post('/newitems',cors(), createNewItem);

//Update Newitem by ID
const updateNewItem = (req, res) => {
    const id = req.params.id;
    let sql = `UPDATE smartphones SET title=?, image=?, price=?, type=? ,description=?, 
    spec1=?, spec2=?, spec3=?, spec4=?, spec5=? WHERE id=${id}`;
    let values = [
        req.body.title,
        req.body.image,
        req.body.price,
        req.body.type,
        req.body.description,
        req.body.spec1,
        req.body.spec2,
        req.body.spec3,
        req.body.spec4,
        req.body.spec5,
    ];
    db.query( sql, values , function (err, results, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New item updated successfully"
        })
    });
}
router.put('/newitems/:id',cors(), updateNewItem);




//delete new item by ID
const deleteNewItem = (req, res) => {
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
}
router.delete('/newitems/:id',cors(), deleteNewItem);


module.exports = router;