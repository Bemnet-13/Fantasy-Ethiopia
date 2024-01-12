const loginButton = document.getElementById("login");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

async function loginUser(email, password) {
  const loginEndpoint = "http://localhost:3000/auth/login";

  try {
    const response = await fetch(loginEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
        password: password,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);

    console.log("Login successful! Token stored:", token);
    window.location.href = "About-User.html";
  } catch (error) {
    console.error("Error during login:", error.message);
  }
}

// Example usage
loginButton.addEventListener("click", () => {
  loginUser(inputEmail.value, inputPassword.value);
});
