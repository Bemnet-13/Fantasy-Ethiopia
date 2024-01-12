const loginButton = document.getElementById("login");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

async function loginUser(email, password) {
  const loginEndpoint = "http://localhost:3000/auth/login";

  try {
    const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("dhghgohg", response);
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);

    alert("Login successful! Token stored:", token);
    window.location.href = "About-User.html";
  } catch (error) {
    alert("Error during login:", error.message);
  }
}

loginButton.addEventListener("click", () => {
  console.log("Email", inputEmail.value, "Password", inputPassword.value);
  loginUser(inputEmail.value, inputPassword.value);
});
