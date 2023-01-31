const container = document.querySelector(".container");
const showUserContainer = document.getElementById("showUserContainer");
const register = document.querySelector(".register");

const mainDisplay = document.querySelector(".mainDisplay");
const formContainer = document.querySelector(".form-container");
const secondFormContainer = document.querySelector(".secondFormContainer");

const date = new Date();
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
        <div class="card m-4 " style="width: 20rem;">
          <div class="card-body d-flex flex-column " style="height : 220px">
            <div class="">
              <h5>Name - ${user.name}</h5>
              <h5>Email - ${user.email}</h5>
              <h5>Password - ${user.pw}</h5>
              <h6 class="createdTime">Created Time - ${user.createdAt}</h6>
              <h6 class="updatedTime">Updated Time - ${user.updatedAt}</h6>
            </div>

            <div class=" d-flex justify-content-end mt-auto">
              <button class="btn btn-sm btn-primary edit align-self-end me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-name="${user.name}" data-email="${user.email}" data-pw="${user.pw}" data-create="${user.createdAt}" data-update="${user.updatedAt}">Edit</button>
              <button class="btn btn-sm btn-danger delete align-self-end" data-email="${user.email}">Delete</button>
            </div>
          </div>
          
        </div>
            `;

    showUserContainer.append(div);
  });

  const edits = document.querySelectorAll(".edit");

  const editProcess = async (name, email, pw, updatedAt) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, email, pw, updatedAt }),
    });
    const data = await response.json();
  };

  edits.forEach((edit) => {
    edit.addEventListener("click", () => {
      const editName = document.querySelector(".editName");
      const editEmail = document.querySelector(".editEmail");
      const editPassword = document.querySelector(".editPassword");
      const updatedTime = document.querySelector(".updatedTime");

      console.log(edit.dataset);
      const { name, email, pw } = edit.dataset;

      editName.value = name;
      editEmail.value = email;
      editPassword.value = pw;

      // let timeUpdate = edit.dataset.update;
      // console.log(timeUpdate)

      const updateEdit = document.getElementById("updateEdit");

      updateEdit.addEventListener("click", () => {
        console.log(editName.value, editEmail.value, editPassword.value);
        editProcess(editName.value, editEmail.value, editPassword.value);
        // updatedTime.textContent = timeUpdate;
        updatedTime.innerHTML = `<h6>Updated Time - ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</h6>`;

        const newModal = document.querySelector(".newModal");
        console.log(bootstrap);
        const modal = bootstrap.Modal.getOrCreateInstance(newModal);
        modal.hide();
      });
    });
  });

  const deleteBtns = document.querySelectorAll(".delete");

  const deleteProcess = async (email) => {
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ email }),
    });
  };

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const deleteWithEmail = deleteBtn.dataset.email;
      console.log(deleteWithEmail);

      deleteProcess(deleteWithEmail);
    });
  });
};
getAllUsers();

register.addEventListener("click", (e) => {
  e.preventDefault();

  const registerEmail = document.querySelector(".email");
  const registerName = document.querySelector(".name");
  const registerPassword = document.querySelector(".password");
  const createdTime = document.querySelector(".updatedTime");

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
  createdTime.innerHTML = `<h6>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</h6>`;
  const createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const updatedAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const registerUser = async () => {
    const url = "http://localhost:3000/users";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, pw, createdAt, updatedAt }),
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
