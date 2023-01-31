const container = document.querySelector(".container");
const showUserContainer = document.getElementById("showUserContainer");
const register = document.querySelector(".register");

const mainDisplay = document.querySelector(".mainDisplay");
const formContainer = document.querySelector(".form-container");
const secondFormContainer = document.querySelector(".secondFormContainer");

let allUsersInfo = null;

const getAllUsers = async () => {
  const url = "http://localhost:3000/users";
  const response = await fetch(url);
  let users = await response.json();
  allUsersInfo = users;

  users.forEach((user) => {
    let div = document.createElement("div");
    div.classList.add("editCardController", "d-block");
    div.innerHTML = `
        <div class="card m-4 " style="width: 18rem;">
          <div class="card-body" style="height : 190px">
            <h5>Name - ${user.name}</h5>
            <h5>Email - ${user.email}</h5>
            <h5>Password - ${user.pw}</h5>

            <div class=" mt-3 d-flex justify-content-end">
              <button class="btn btn-sm btn-primary edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-name="${user.name}" data-email="${user.email}" data-pw="${user.pw}">Edit</button>
              <button class="btn btn-sm btn-danger delete" data-email="${user.email}">Delete</button>
            </div>
          </div>
          
        </div>
            `;

    showUserContainer.append(div);
  });

  const edits = document.querySelectorAll(".edit");

  const editProcess = async (name, email, pw) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, email, pw }),
    });
    const data = await response.json()
  };

  edits.forEach((edit) => {
    edit.addEventListener("click", () => {
      const editName = document.querySelector(".editName");
      const editEmail = document.querySelector(".editEmail");
      const editPassword = document.querySelector(".editPassword");
      console.log(edit.dataset);
      const { name, email, pw } = edit.dataset;

      editName.value = name;
      editEmail.value = email;
      editPassword.value = pw;

      const updateEdit = document.getElementById("updateEdit");

      updateEdit.addEventListener("click", () => {
        console.log(editName.value, editEmail.value, editPassword.value);
        editProcess(editName.value, editEmail.value, editPassword.value);

        const newModal = document.querySelector(".newModal");
        console.log(bootstrap);
        const modal = bootstrap.Modal.getOrCreateInstance(newModal);
        modal.hide();
      });
    });
  });

  const deleteBtns = document.querySelectorAll(".delete");

  const deleteProcess = async (email) => {
    const response = await fetch(url , {
      method : "DELETE",
      body : JSON.stringify({email})
    })      

  
  }

  deleteBtns.forEach((deleteBtn) => {
    
    deleteBtn.addEventListener("click" , () => {

      const deleteWithEmail = deleteBtn.dataset.email
      console.log(deleteWithEmail)


      deleteProcess(deleteWithEmail)
    } )
  })
  




};
getAllUsers();

register.addEventListener("click", (e) => {
  e.preventDefault();

  const registerEmail = document.querySelector(".email");
  const registerName = document.querySelector(".name");
  const registerPassword = document.querySelector(".password");

  if (
    registerName.value === "" ||
    registerEmail.value === "" ||
    registerPassword.value === ""
  ) {
    alert("Fill Your Info!!!");
    return;
  }

  const name = registerName.value;
  const email = registerEmail.value;
  const pw = registerPassword.value;

  const registerUser = async () => {
    const url = "http://localhost:3000/users";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, pw }),
    });
    let data = await response.json();
    console.log(data);

    // if (data.status === "success") {
    //   getAllUsers(name , email , pw);
    //   console.log(name , email , pw)
    // }
  };
  registerUser();
  setTimeout(() => {
    location.reload();
  }, 500);
});









// const handleFileUpload = async () => {
//   const inputUploadFile = document.querySelector('#inputUploadFile');
//   console.log(inputUploadFile.files)
//   const response = await fetch("http://localhost:3000/fileUpload", {
//     method : "POST",
//     body : inputUploadFile.files[0],
//   });
//   console.log(await response.json())
// }
