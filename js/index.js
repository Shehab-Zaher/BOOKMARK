// get all elements
const inputUrl = document.getElementById("inputURL");
const inputName = document.getElementById("inputName");
const tableBody = document.getElementById("table-body");
const searchField = document.getElementById("search");
let allData = [];
//lazy initialization
if (localStorage.getItem("data") != null) {
  allData = JSON.parse(localStorage.getItem("data"));
}

//load all data to table from local storage
addEventListener("load", () => {
  displayData();
});

//choose unique name
function nameExists(NewName) {
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].name == NewName) {
      return false;
    }
  }
  return true;
}

function validation(name, url) {
  RegName = /[A-z]{3,}/;
  RegURL =
    /https?:\/\/([A-z]|[0-9]|[A-z].)+.com(\/{1}([A-z|1-9][=|.|_|\-|&|\?]?)+)*$/;
  if (RegName.test(name) && RegURL.test(url) && nameExists(name)) {
    return true;
  }
  return false;
}

function clear() {
  inputUrl.value = "";
  inputName.value = "";
}

function displayData() {
  let htmlData = "";
  for (let i = 0, cnt = 1; i < allData.length; i++, cnt++) {
    htmlData += `<tr>
        <th scope="row">${cnt}</th>
        <td>${allData[i].name}</td>
        <td>
          <a
            class="btn text-decoration-none px-2 py-1 rounded-2"
            href="${allData[i].URL}"
            target="_blank"
            ><i class="fa-solid text-white me-1 fa-eye"></i> Visit</a
          >
        </td>
        <td>
          <a
            class="btn d-btn text-decoration-none px-2 py-1 rounded-2 bg-danger"
            onclick="deleteItem(${i})"
            ><i class="fa-solid me-1 fa-trash-can"></i> Delete</a
          >
        </td>
      </tr>`;
  }
  tableBody.innerHTML = htmlData;
}

//delete item
function deleteItem(idx) {
  allData.splice(idx, 1);
  if (searchField.value) {
    search(searchField.value);
  } else {
    displayData();
  }
  localStorage.setItem("data", JSON.stringify(allData));
}

//trigger modal dialog
function modalTrigger() {
  const modal = bootstrap.Modal.getOrCreateInstance("#warningModal");
  modal.show();
}

//add function
function btn_function() {
  let url = inputUrl.value;
  let UrlName = inputName.value;
  if (!validation(UrlName, url)) {
    modalTrigger();
    return;
  }
  //set data in object
  let data = {
    name: UrlName,
    URL: url,
  };
  //set obj in array
  allData.push(data);
  //write the array to local storage
  localStorage.setItem("data", JSON.stringify(allData));
  //write data to table
  tableBody.innerHTML += `<tr>
  <th scope="row">${allData.length}</th>
  <td>${data.name}</td>
  <td>
    <a
      class="btn text-decoration-none px-2 py-1 rounded-2"
      href="${data.URL}"
      target="_blank"
      ><i class="fa-solid text-white me-1 fa-eye"></i> Visit</a
    >
  </td>
  <td>
    <a
      class="btn d-btn text-decoration-none px-2 py-1 rounded-2 bg-danger"
      onclick="deleteItem(${allData.length - 1})"
      ><i class="fa-solid me-1 fa-trash-can"></i> Delete</a
    >
  </td>
</tr>`;
  //clear inputs
  clear();
}

//live search
function search(val) {
  let searchRes = "";
  if (!val) {
    displayData();
  }
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].name.toLowerCase().includes(val.toLowerCase())) {
      searchRes += `
      <tr>
      <th scope="row">${allData.length}</th>
      <td>${allData[i].name}</td>
      <td>
        <a
      class="btn text-decoration-none px-2 py-1 rounded-2"
      href="${allData[i].URL}"
      target="_blank"
      ><i class="fa-solid text-white me-1 fa-eye"></i> Visit</a
        >
      </td>
      <td>
        <a
      class="btn d-btn text-decoration-none px-2 py-1 rounded-2 bg-danger"
      onclick="deleteItem(${i})"
      ><i class="fa-solid me-1 fa-trash-can"></i> Delete</a
        >
      </td>
    </tr>`;
    }
  }
  tableBody.innerHTML = searchRes;
}
