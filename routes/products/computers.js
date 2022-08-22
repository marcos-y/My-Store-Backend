const express = require('express');
const router = express.Router();
const multer = require('multer');

//Multer for Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/computers')
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
app.listen( 8002, function () {
    console.log('CORS-enabled web server listening on port 8003')
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

/* Computers */
//get computer list
const getComputerList = (req, res, next) => {
    let sql = `SELECT * FROM computers`;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          data,
          message: "Computer lists retrieved successfully"
        })
    })
}
router.get('/computers', cors(), getComputerList);


//get computer by ID
const getComputer = (req, res, next) => {
    const id = req.params.id;
    console.log('Get user id = ' + id);
    let sql = 'SELECT * FROM computers WHERE id = ?'
    db.query(sql , [id], (err, results) => {
            res.json({
                status: 200,
                message: results
            })
    })
}
router.get('/computers/:id', cors(), getComputer );



//create new computer
const createComputer = (req, res) => {
    const urlImage = 'http://localhost:8080/images/computers/' + req.file.filename;
    console.log(urlImage);
    let sql = `INSERT INTO computers(title,image,price,type,description,spec1,spec2,spec3,spec4,spec5) VALUES (?)`;
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
        message: "New computer added successfully"
      })
    })
  }
router.post('/computers', cors(), upload.single("image"), createComputer);



// Update computer by ID
const updateComputer =  (req, res) => {
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
}
router.put('/computers/:id',  cors(),updateComputer);



//Delete computer by ID
const deleteComputer =  (req, res) => {
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
}
router.delete('/computers/:id', cors(), deleteComputer);


module.exports = router;