function showLoginForm() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("resetForm").style.display = "none";
}

function showRegisterForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("resetForm").style.display = "none";
}

function showResetForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("resetForm").style.display = "block";
}

// Thêm sự kiện submit cho các form nếu cần
document.getElementById("loginForm").addEventListener("submit", handleLogin);
document
  .getElementById("registerForm")
  .addEventListener("submit", handleRegister);
document.getElementById("resetForm").addEventListener("submit", handleReset);

function validateEmail(input) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.value)) {
    document.getElementById("formMessage").textContent = "Email không hợp lệ.";
  } else {
    document.getElementById("formMessage").textContent = "";
  }
}

function validatePassword(input) {
  if (input.value.length < 8) {
    document.getElementById("formMessage").textContent =
      "Mật khẩu phải có ít nhất 8 ký tự.";
  } else {
    document.getElementById("formMessage").textContent = "";
  }
}

function validatePasswordMatch() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
    document.getElementById("formMessage").textContent = "Mật khẩu không khớp.";
  } else {
    document.getElementById("formMessage").textContent = "";
  }
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleText = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleText.textContent = "Ẩn";
  } else {
    passwordInput.type = "password";
    toggleText.textContent = "Hiển thị";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document
    .getElementById("registerForm")
    .addEventListener("submit", handleRegister);
});

function handleLogin(event) {
  event.preventDefault(); // Ngăn không cho form gửi theo cách mặc định
  const email = document.querySelector("#loginForm input[type=email]").value;
  const password = document.querySelector(
    "#loginForm input[type=password]"
  ).value;
  console.log("Đăng ký với:", fullName, email, password, confirmPassword);
}
