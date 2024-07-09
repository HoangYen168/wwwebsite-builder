document
  .getElementById("imageInput")
  .addEventListener("change", handleFiles, false);
let dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  handleFiles(event.dataTransfer.files);
});

function handleFiles(files) {
  const imageDisplay = document.getElementById("imageDisplay");
  for (let i = 0, file; (file = files[i]); i++) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const container = createImageContainer(e.target.result);
        imageDisplay.appendChild(container);
      };
      reader.readAsDataURL(file);
    }
  }
}

// Hàm tạo container cho hình ảnh và nút xóa
function createImageContainer(imageSrc) {
  const container = document.createElement("div");
  container.classList.add("image-container");

  const img = document.createElement("img");
  img.src = imageSrc;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = function () {
    container.remove();
  };

  container.appendChild(img);
  container.appendChild(deleteBtn);

  return container;
}

// Hàm thêm hình ảnh từ URL
function addImage() {
  const url = document.getElementById("imageUrl").value;
  if (url) {
    const container = createImageContainer(url);
    document.getElementById("imageDisplay").appendChild(container);
  }
}
