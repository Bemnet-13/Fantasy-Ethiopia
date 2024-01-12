// signup.js

const { sign } = require("crypto");

const signupButton = document.getElementById("signup");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const adminRadio = document.getElementById("admin");

async function signupUser(name, email, password, admin) {
  const signupEndpoint = "http://localhost:3000/auth/signup";

  try {
    const response = await fetch(signupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        admin: admin,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Signup successful! Redirecting to login page.");
    window.location.href = "login.html"; // Redirect to the login page
  } catch (error) {
    console.error("Error during signup:", error.message);
    alert("Signup failed. Please try again."); // Display an error message
  }
}

// Example usage
signupButton.addEventListener("click", () => {
  console.log("clicked");
  signupUser(
    inputName.value,
    inputEmail.value,
    inputPassword.value,
    adminRadio.value
  );
});
