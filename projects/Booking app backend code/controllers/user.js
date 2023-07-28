const user=require('../models/user');
exports.adduser=(req,res,next)=>{
    console.log("in post");
    const name=req.body.Name;
    const email=req.body.Email;
    const number=req.body.Number;
    user.create({
        name:name,
        email:email,
        number:number
    })
    .then(result=>{
        user.findByPk(result.id,{
            attributes:['id','name','email','number']
           
        })
        .then((user)=>res.send(user))
        .catch((err)=>console.log(err));
    })
    .catch(err=>console.log(err));


}



exports.getuser=(req,res,next)=>{
    user.findAll({
        attributes:['id','name','email','number']
    })
    .then(user=>{
        res.send(user);
    })
    .catch(err=>console.log(err));
}

exports.deleteuser=(req,res,next)=>{
    const userId=req.params.id;
    console.log(userId);
    user.destroy({where:{ id : userId}})
    .then(data=>{console.log("deleted");res.send("deleted successful")})
    .catch(errr=>console.log(errr));

}


exports.updateuser=(req,res,next)=>{
    const userId=req.params.id;
    const userUpdate=req.body;
    user.update({
        name:userUpdate.name,
        email:userUpdate.email,
        number:userUpdate.number
    },{
        where: {id:userId}
    })
    .then(result=>{console.log('successfully updated'); res.send("updated")})
    .catch(err=>console.log(err));

    
}
