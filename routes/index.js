var express = require('express');
const pool = require('./pool');
var router = express.Router();
var aes256 = require("aes256");
var passkey = "pass";


/*an api to fetch the details of an assisatnt with required id*/
router.get('/assistant/:aid',(req,res)=>{
  const aid=req.params.aid;
  pool.query(`select * from assistant where id=?`,[aid],(err,obj)=>{
    if(err){
      console.log(err)
      res.send({status:"err",message:"an error occured"})
    }
    else{
      if(obj.length==0){
        console.log('no assistant available with this id')
        res.send({status:"warning",message:"no assistant available with this id"})
      }
      else{
        res.send({status:"success",message:"retrieved successfully",data:obj})
      }
    }
  })
})

/*an api which updates the fields of an assistant with specific id */
router.put('/assistant/:aid', (req, res) => {
  const aid= req.params.aid;
  const text=req.body;
  console.log(text,aid)
 pool.query('UPDATE assistant SET name = ?, mobile = ?, email = ?, salary = ?, city = ?, country = ?, department = ? WHERE id = ?',[text.name, text.mobile, text.email, text.salary, text.city, text.country, text.department,aid],
      (error, results, fields) => {
          if (error) {
              console.error('Error updating data in database:', error);
              res.send({status:"err",message:"cannot update "})
          } 
          else {
            if(results.affectedRows==0){
              res.send({status:"warning",message:"the assistant does not exist so cant be updated"})
            }
            else
            res.send({status:"success",message:"successfully updated"});
        }
      }
  );
});

/* an api to insert data into the database */
router.post('/assistant',(req,res)=>{
  const text=req.body;
  pool.query(`select email from assistant where email=?`,[text.email],(err,obj)=>{
    if(err){
      res.send({status:"err",message:"an error occured"})
    }

    /*assistant is found*/
    else {
      if(obj.length!=0){
        res.send({status:"warning",message:"assistant already exist"})
      }
      else{
        pool.query('INSERT INTO `assistant`(`name`, `mobile`, `email` , `salary`,`city`,`country`,`department`) VALUES (?,?,?,?,?,?,?)', [text.name,text.mobile,text.email,text.salary,text.city,text.country,text.department], (err2,obj2)=>{
          if(err2){
            console.log(err2)
            res.send({status:"err",message:"an error occured"})
           
          }
          else{
             res.send({status:"success",message:"successfully inserted"})
            
          }
        })
      }
    }
  })
  
})


/* an api to delete the entries of an assistant */
router.delete('/assistant/:aid' , (req,res)=>{
  const idToDelete = req.params.aid;
  pool.query(`DELETE FROM assistant WHERE id = ?`, [idToDelete], (error, results , fields) => {
      if (error) {
          console.error('Error deleting data from database:', error);
          res.send({status:"err",message:"error deleting"})
      } 
      else {
        if(results.affectedRows==0){
          res.send({status:"warning",message:"assistant not found"})
        }
        else
        res.send({status:"success",message:"successfully deleted"})

      }

  });
  
})










router.get('/table', (req, res) => {
  pool.query('SELECT * FROM assistant', (error, results, fields) => {
      if (error) {
          console.error('Error fetching data from database:', error);
          res.render('error', { message: 'Error fetching data from database' });
      } else {
          res.render('table', { assistants: results });
      }
  });
});


router.get('/forms' , (req,res)=>{
  res.render('forms.ejs');
})

router.get('/update' , (req,res)=>{
  const idToupdate = req.query.id;
  console.log(idToupdate);
  pool.query('SELECT * FROM assistant where id=?',[idToupdate], (error, results, fields) => {
    if (error) {
        console.error('Error fetching data from database:', error);
   
    } 
    else {
        res.render('update', { assistant: results });
    }
});

})




router.get('/delete' , (req,res)=>{
  const idToDelete = req.query.id;
  pool.query(`DELETE FROM assistant WHERE id = ?`, [idToDelete], (error, results , fields) => {
      if (error) {
          console.error('Error deleting data from database:', error);
      } 
      else {
         res.redirect('/table');
      }
  });
  
})


router.post('/updateform/:aid', (req, res) => {
  const aid= req.params.aid;
  const text=req.body;
  console.log(text,aid)
 pool.query('UPDATE assistant SET name = ?, mobile = ?, email = ?, salary = ?, city = ?, country = ?, department = ? WHERE id = ?',[text.name, text.mobile, text.email, text.salary, text.city, text.country, text.department,aid],
      (error, results, fields) => {
          if (error) {
              console.error('Error updating data in database:', error);
          
          } 
          else {
             console.log('hello')
            res.redirect('/table');
        }
      }
  );
});

router.post('/formsignup',(req,res)=>{
      const text=req.body;
      pool.query('INSERT INTO `assistant`(`name`, `mobile`, `email` , `salary`,`city`,`country`,`department`) VALUES (?,?,?,?,?,?,?)', [text.name,text.mobile,text.email,text.salary,text.city,text.country,text.department], (err2,obj2)=>{
        if(err2){
          console.log(err2)
         
        }
        else{
          res.redirect('/table')
        }
      })
})


module.exports = router;
