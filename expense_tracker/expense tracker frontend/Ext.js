
//document.getElementById('list').addEventListener('click',remove);

let flag=0;
let idtoedit=0;
var list=document.querySelector('#list');
let amount=document.querySelector('#amount');
let description=document.querySelector('#des');
let cat=document.querySelector('#category');
document.getElementById('Add').addEventListener('click',add);



 function add(e){
    console
    
    e.preventDefault();
    console.log("hi");
    
    //var li =document.createElement('li');
    let obj={
        amount1:amount.value,
        dis:description.value,
        category:cat.value
    }
    //let myserial=JSON.stringify(obj);

    if(flag==1){
        flag=0;
        updateexpense(idtoedit,obj);

    }
    else{
        post( obj);

    }
    
}


function deleteexpense(id){
    console.log("delelte");
    const nodetodelte=document.getElementById(id);
    if(nodetodelte){
        list.removeChild(nodetodelte);
    }
   
    axios.delete(`http://localhost:3000/deleteexpense/${id}`)
    .then((result)=>console.log('deleted'))
    .catch((err)=>console.log(err));

}

function post( myserial){
    console.log(myserial);
    axios.post('http://localhost:3000/postexpense', myserial)
    .then((result)=>{
        
        showUsersOnScreen(result);
        


    })
    .catch((err)=>console.log(err));
}


function showUsersOnScreen(data){
    const childHTML=`<li id=${data.id}> ${data.amount}: ${data.description}: ${data.category}
    <button onclick=deleteexpense("${data.id}")>Delete</button>
    <button onclick=editexpense("${data.id}","${data.amount}","${data.description}","${data.category}")>Edit</button>
    </li>`;
    list.innerHTML=list.innerHTML+childHTML;
    

}

function editexpense(id,amount,description,category){
document.querySelector('#amount').value=amount;
document.querySelector('#des').value=description;
document.querySelector('#category').value=category;
   
    flag=1;
    idtoedit=id;
    

}

function updateexpense(id,obj){
    axios.put(`http://localhost:3000/updateexpense/${id}`,obj)
    .then((r)=>console.log('updated'))
    .catch(err=>console.log(err));
}



document.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/getexpense')
    .then((result)=>{
        console.log(result);
        for(let i=0;i<result.data.length;i++){
            
            showUsersOnScreen(result.data[i]);
        }
        
    })
})
