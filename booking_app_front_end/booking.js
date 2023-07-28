const myform = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector('#phonenumber');
const userList = document.querySelector("#users");
var id;
var flag = 0;
const userIncrocs = {};
var userId;

myform.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(userIncrocs);

  if (nameInput.value === "" || emailInput.value === "") {
    alert('Please fill all details');
  } else {
    const userDetails = {
      Name: nameInput.value,
      Email: emailInput.value,
      Number: phoneInput.value
    };

    if (flag === 1) {
        flag = 0;
      putRequest(userDetails,userId);
      
    } else {
      console.log(userDetails);

      axios.post('http://localhost:8000/postuser', userDetails)
        .then((response) => {
          //console.log(response);
          console.log(response.data);
          showUsersOnScreen(response.data);
          
        })
        .catch((err) => console.log(err));
    }

    //showUsersOnScreen(userDetails);
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
}

function showUsersOnScreen(user) {
  const parentNode = document.getElementById("users");

  const childHTML = `
    <li id=${user.email}> ${user.name} : ${user.email} : ${user.number}
      <button onclick=deleteUser("${user.email}")> Delete User </button> 
      <button onclick=editDetails("${user.email}","${user.name}","${user.number}","${user.id}")>Edit Details </button>
    </li>`;

  console.log(user.Number);
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editDetails(email,name,phonenumber,id) {
  console.log('hiiiii');
  document.getElementById('email').value = email;
  document.getElementById('name').value = name;
  document.getElementById('phonenumber').value = phonenumber;
  userId=id;
  flag = 1;
  
}

function deleteUser(email) {
  const idofuser = userIncrocs[email];
  
  axios.delete(`http://localhost:8000/deleteuser/${idofuser}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  removeUserFromScreen(email);
}

function removeUserFromScreen(email) {
  const parentNode = document.getElementById('users');
  const deleteChild = document.getElementById(email);
  if (deleteChild) {
    parentNode.removeChild(deleteChild);
  }
}

function putRequest(user,userId) {
  
  axios.put(`http://localhost:8000/updateuser/${userId}`,user)
  .then((response) => console.log("edit successful"))
  .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', () => {
  axios.get('http://localhost:8000/getuser')
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        userIncrocs[response.data[i].email] = response.data[i].id;
        showUsersOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
});
