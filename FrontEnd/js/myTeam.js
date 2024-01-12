let score = 0;
let token = localStorage.getItem("token");
const endpoint = "http://localhost:3000/players/team";
fetch(endpoint, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    return response.json(); // Return the response data for further processing
  })
  .then((responseData) => {
    responseData.forEach((elem) => {
      console.log(elem);
      score += elem.Score;
    });
    document.getElementById("totalscore").innerHTML = score;
  })
  .catch((error) => {
    console.error("Error during GET request:", error.message);
  });
