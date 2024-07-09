// JavaScript cho chức năng tìm kiếm
function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    
    // Lặp qua tất cả các mục danh sách và ẩn những người không phù hợp với truy vấn tìm kiếm
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
    } else {
    li[i].style.display = "none";
    }
    }
    }
    
    // JavaScript cho slideshow hình ảnh
    var slideIndex = 0;
    showSlides();
    
    function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); // Thay đổi hình ảnh mỗi 2 giây
    }
    
    // JavaScript cho form đăng nhập
    function loginFunction() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Kiểm tra thông tin đăng nhập (ví dụ đơn giản)
    if(username == "user" && password == "pass") {
    alert("Đăng nhập thành công!");
    // Chuyển hướng người dùng đến trang chủ hoặc trang họ muốn đến sau khi đăng nhập
    window.location = "home.html"; // Thay đổi 'home.html' thành trang bạn muốn chuyển đến
    } else {
    alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
    }