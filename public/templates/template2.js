function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var copy = document.getElementById(data).cloneNode(true);
  event.target.appendChild(copy);
}

// Thêm sự kiện kéo cho mỗi component
var draggables = document.getElementsByClassName("draggable");
for (var i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("dragstart", drag);
}

// Thêm hiệu ứng khi component được kéo vào drop zone
var dropZone = document.getElementById("drop-zone");
dropZone.addEventListener("dragover", function () {
  this.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", function () {
  this.classList.remove("drag-over");
});

// Thêm mã JavaScript để xử lý sự kiện click và chỉnh sửa
var editModal = document.getElementById("edit-modal");
var editForm = document.getElementById("edit-form");
var contentInput = document.getElementById("content");
var currentComponent;

// Khi người dùng click vào một component trong drop zone
document
  .getElementById("drop-zone")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("draggable")) {
      currentComponent = event.target;
      contentInput.value = currentComponent.innerHTML;
      editModal.style.display = "block";
    }
  });

// Khi người dùng click vào nút đóng (x) trên modal
document.getElementsByClassName("close")[0].onclick = function () {
  editModal.style.display = "none";
};

// Khi người dùng cập nhật nội dung thông qua form chỉnh sửa
editForm.onsubmit = function (event) {
  event.preventDefault();
  currentComponent.innerHTML = contentInput.value;
  editModal.style.display = "none";
};

// Thêm mã để đóng modal khi người dùng click ra ngoài modal
window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
};
