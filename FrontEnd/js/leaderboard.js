const nameWithScore = [];
let token = localStorage.getItem("token");
async function fetchData() {
  const url = "http://localhost:3000/auth";
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in localStorage");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error; // Re-throw the error to reject the promise
  }
}

fetchData().then((data) => {
  console.log(data, "auth data");
  const fetchOperations = data.map((elem) => {
    const endpoint = "http://localhost:3000/players/team";
    let name = elem.name;
    let score = 0;
    const data = {
      id: String(elem._id),
    };

    // Return the fetch promise
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        return response.json(); // Return the response data for further processing
      })
      .then((responseData) => {
        responseData.forEach((elem) => {
          score += elem.Score;
          console.log(elem.Score);
        });
        nameWithScore.push([name, score]);
      })
      .catch((error) => {
        console.error("Error during POST request:", error.message);
      });
  });

  // Wait for all fetch operations to complete before processing nameWithScore
  Promise.all(fetchOperations).then(() => {
    nameWithScore.sort((a, b) => b[1] - a[1]);
    console.log(nameWithScore);
    // Update the DOM with nameWithScore
    nameWithScore.forEach((element) => {
      var newDiv = document.createElement("div");
      newDiv.classList.add(
        "flex",
        "flex-row",
        "ml-10",
        "mr-16",
        "justify-items-center",
        "inline-block",
        "bg-zinc-200"
      );
      // Create and append the child elements
      var userNameDiv = document.createElement("div");
      userNameDiv.classList.add("ml-20");
      userNameDiv.textContent = element[0]; // Use index 0 for name
      newDiv.appendChild(userNameDiv);
      var scoreDiv = document.createElement("div");
      scoreDiv.classList.add("ml-20", "mr-20");
      scoreDiv.textContent = element[1]; // Use index 1 for score
      newDiv.appendChild(scoreDiv);
      // Append the newly created div to the existing content
      var dynamicContent = document.getElementById("dynamicContent");
      dynamicContent.appendChild(newDiv);
    });
  });
});
