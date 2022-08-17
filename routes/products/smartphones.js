const express = require('express');
const router = express.Router();

/* Smartphones */
//get smartphones list
router.get('/smartphones', (req, res, next) => {
    let sql = `SELECT * FROM smartphones`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Smartphones lists retrieved successfully"
        })
    })
});

//get an smartphone by ID
router.get('/products/smartphones/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM smartphones WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            res.json({
                status: 200,
                message: results
            })
    })
});

//create new smartphone
router.post('/smartphones', function(req, res) {
    let sql = `INSERT INTO smartphones(title,image,price,type,description,spec1,spec2,spec3,spec4,spec5) VALUES (?)`;
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
        message: "New smartphone added successfully"
      })
    })
  });


// Update smartphone by ID
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
            message: "Smartphone updated successfully"
        })
    });
})


//delete smartphone by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM smartphones WHERE id = ?', [id], (err, results, response) => {
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