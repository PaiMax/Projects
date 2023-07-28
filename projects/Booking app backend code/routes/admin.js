const express=require('express');
 
const router=express.Router();

const userController=require('../controllers/user');


router.post('/postuser',userController.adduser);







router.get('/getuser',userController.getuser);


router.delete('/deleteuser/:id',userController.deleteuser);



router.put('/updateuser/:id',userController.updateuser);












module.exports=router;