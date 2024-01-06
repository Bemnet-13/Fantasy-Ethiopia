const navIcon = document.getElementById("mobile-menu-button");

navIcon.addEventListener("click", function () {
  var mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

// JavaScript to handle modal show/hide for Food Item 1
document.getElementById("orderButton1").addEventListener("click", function () {
  document.getElementById("orderModal1").classList.remove("hidden");
});

document
  .getElementById("closeModalButton1")
  .addEventListener("click", function () {
    document.getElementById("orderModal1").classList.add("hidden");
  });

// JavaScript to handle modal show/hide for Food Item 2
document.getElementById("orderButton2").addEventListener("click", function () {
  document.getElementById("orderModal2").classList.remove("hidden");
});

document
  .getElementById("closeModalButton2")
  .addEventListener("click", function () {
    document.getElementById("orderModal2").classList.add("hidden");
  });
