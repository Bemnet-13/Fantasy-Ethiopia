// ...

const adder = document.getElementById("adder");

adder.addEventListener("click", () => {
  const endpoint = "http://localhost:3000/players";
  const name = document.getElementById("name").value;
  const club = document.getElementById("club").value;
  const score = parseInt(document.getElementById("Score").value, 10);

  const requestBody = {
    name: name,
    club: club,
    Score: score,
  };

  console.log(requestBody);

  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) {
    console.error("Token not found in localStorage");
  } else {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status == 403) {
          alert("Forbiden only Admin Can Add Player");
          throw new Error("Forbiden Only Admin Can Add Player");
        }
        console.log(response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful", data);
        alert("Player add succsessfully");
        location.reload();
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  }
});

// modify

function modify() {
  const apiUrl = "http://localhost:3000/players";
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((elem) => {
        // Create the outer div
        console.log(elem);
        const outerDiv = document.createElement("div");
        outerDiv.className =
          "flex flex-row ml-10 mr-16 mt-2 mb-4 w-4/5 rounded-lg justify-between items-center inline-block bg-zinc-200";

        const emptyDiv1 = document.createElement("div");
        emptyDiv1.className = "ml-20";

        const playerNameInput = document.createElement("input");
        playerNameInput.setAttribute("data-player-id", elem._id);
        playerNameInput.type = "text";
        playerNameInput.name = "name";
        playerNameInput.placeholder = elem.name;

        const emptyDiv2 = document.createElement("div");
        emptyDiv2.className = "ml-20 mr-20";

        const teamInput = document.createElement("input");
        teamInput.type = "text";
        teamInput.name = "club";
        teamInput.placeholder = elem.club;

        const emptyDiv3 = document.createElement("div");
        emptyDiv3.className = "mr-10";

        const scoreInput = document.createElement("input");
        scoreInput.type = "text";
        scoreInput.name = "score";
        scoreInput.placeholder = elem.Score;

        const emptyDiv4 = document.createElement("div");
        emptyDiv4.className = "mr-20";
        const deleteButton = document.createElement("input");
        deleteButton.type = "submit";
        deleteButton.setAttribute("data-player-id", elem._id);
        deleteButton.value = "Delete";
        deleteButton.style.padding = "10px";
        deleteButton.style.margin = "10px";
        deleteButton.style.backgroundColor = "red";
        deleteButton.className =
          "bg-zinc-400 rounded-lg p-2 text-white hover:bg-zinc-500 md:p-2";

        deleteButton.addEventListener("click", () => {
          function deletePlayer(playerId) {
            const token = localStorage.getItem("token");

            const apiUrl = "http://localhost:3000/players";

            const headers = new Headers({
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            });

            const deleteRequest = new Request(`${apiUrl}/${playerId}`, {
              method: "DELETE",
              headers: headers,
            });

            fetch(deleteRequest)
              .then((response) => {
                if (response.status == 403) {
                  alert("Forbiden, Updating Players is allowed only for Admin");

                  throw new Error();
                }
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                console.log("Player deleted successfully:", data);
                alert("Deleted");
              })
              .catch((error) => {
                console.error("Error deleting player:", error);
              });
          }

          const playerIdToDelete = deleteButton.getAttribute("data-player-id");
          deletePlayer(playerIdToDelete);
          location.reload();
        });

        const modifyButton = document.createElement("input");
        modifyButton.setAttribute("data-player-id", elem._id);
        modifyButton.type = "submit";
        modifyButton.value = "Modify";
        modifyButton.style.padding = "10px";
        modifyButton.style.margin = "10px";
        modifyButton.style.color = "Black";
        modifyButton.style.backgroundColor = "yellow";
        modifyButton.className =
          "bg-zinc-400 rounded-lg p-2 text-white hover:bg-zinc-500 md:p-2";

        modifyButton.addEventListener("click", () => {
          function updatePlayer(playerId, updatedData) {
            const token = localStorage.getItem("token");

            const apiUrl = "http://localhost:3000/players";

            const headers = new Headers({
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            });

            const updateRequest = new Request(`${apiUrl}/${playerId}`, {
              method: "PUT", // Change the method to PUT
              headers: headers,
              body: JSON.stringify(updatedData), // Include the data to update in the request body
            });

            fetch(updateRequest)
              .then((response) => {
                if (response.status == 403) {
                  alert("Forbiden, Updating Players is allowed only for Admin");
                  throw new Error();
                }
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                console.log("Player updated successfully:", data);
                alert("Updated");
              })
              .catch((error) => {
                console.error("Error updating player:", error);
              });
          }

          // Example: Updating a player with new data

          const playerIdToUpdate = modifyButton.getAttribute("data-player-id");
          const updatedData = {
            name:
              modifyButton.parentElement.parentElement.querySelector(
                'input[name="name"]'
              ).value ||
              modifyButton.parentElement.parentElement.querySelector(
                'input[name="name"]'
              ).placeholder,
            club:
              modifyButton.parentElement.parentElement.querySelector(
                'input[name="club"]'
              ).value ||
              modifyButton.parentElement.parentElement.querySelector(
                'input[name="club"]'
              ).placeholder,
            Score: Number(
              modifyButton.parentElement.parentElement.querySelector(
                'input[name="score"]'
              ).value ||
                modifyButton.parentElement.parentElement.querySelector(
                  'input[name="score"]'
                ).placeholder
            ),
          };
          console.log(updatedData, "The update Obj");
          updatePlayer(playerIdToUpdate, updatedData);
          location.reload(); // This line reloads the page; adjust as needed
        });

        outerDiv.appendChild(emptyDiv1);
        outerDiv.appendChild(playerNameInput);
        outerDiv.appendChild(emptyDiv2);
        outerDiv.appendChild(teamInput);
        outerDiv.appendChild(emptyDiv3);
        outerDiv.appendChild(scoreInput);
        outerDiv.appendChild(emptyDiv4);
        emptyDiv4.appendChild(deleteButton);
        emptyDiv4.appendChild(modifyButton);
        console.log(document.getElementById("player-list"));

        document.getElementById("player-list").appendChild(outerDiv);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
modify();
