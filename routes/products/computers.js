const express = require('express');
const router = express.Router();

/* Computers */
//get computer list
router.get('/computers', (req, res, next) => {
    let sql = `SELECT * FROM computers`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Computer lists retrieved successfully"
        })
    })
});

//get computer by ID
router.get('/products/computers/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM computers WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            res.json({
                status: 200,
                message: results
            })
    })
});

//create new computer
router.post('/computers', function(req, res) {
    let sql = `INSERT INTO computers(title,image,price,type,description,spec1,spec2,spec3,spec4,spec5) VALUES (?)`;
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
        message: "New computer added successfully"
      })
    })
  });

// Update computer by ID
router.put('/:id', (req, res) => {
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
            message: "Computer updated successfully"
        })
    });
})

//delete computer by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM computers WHERE id = ?', [id], (err, results, response) => {
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