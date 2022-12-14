const express = require('express');
const router = express.Router();
const multer = require('multer');

//Multer for Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/drones')
      console.log(req)
      console.log(file)
    },
    filename: function (req, file, cb) {
        console.log(req)
        console.log(file)
      const name = ( Date.now() + '-' + file.originalname )
      cb(null, file.fieldname + '-' + name)
    }
})
const upload = multer({ storage: storage })

//CORS
var cors = require('cors');
app.use(cors());
app.listen( 8003, function () {
    console.log('CORS-enabled web server listening on port 8004')
});

//Token
const controlarToken = async (req,res,next) =>{
    const tokenBackend = 'holaSoyElToken';
    const tokenCliente = req.headers.token;
    console.log('TokenCliente',tokenCliente);
    console.log('pasando por el middleware controlar token');
    if (!tokenCliente || (tokenBackend != tokenCliente)){
        //son distintos, no deberia poder ejecutar la accion pedida , por tanto lo rechazo
        res.status(401).json({mensaje:'No autorizado a realizar la peticion'})
    }
    else{
        next();
    }
}

/* Drones */
//get drone list
const getDrones = (req, res, next) => {
    let sql = `SELECT * FROM drones`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Drone lists retrieved successfully"
        })
    })
}
router.get('/drones',  cors(), getDrones);



//get drone by ID
const getDrone = (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM drones WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            res.json({
                status: 200,
                message: results
            })
    })
}
router.get('/drones/:id',  cors(), getDrone );


//create new drone
const createDrone = (req, res) => {
    const urlImage = 'http://localhost:8080/images/drones/' + req.file.filename;
    let sql = `INSERT INTO drones(title,image,price,type,description,spec1,spec2,spec3,spec4,spec5) VALUES (?)`;
    let values = [
      req.body.title,
      urlImage,
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
        message: "New drone added successfully"
      })
    })
}
router.post('/drones',  cors(), upload.single("image"), createDrone);



// Update drone by ID
const updateDrone = (req, res) => {
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
            message: "Drone updated successfully"
        })
    });
}
router.put('/drones/:id',  cors(), updateDrone);



//delete drone by ID
const deleteDrone = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM drones WHERE id = ?', [id], (err, results, response) => {
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
router.delete('/drones/:id',  cors(), deleteDrone);


module.exports = router;