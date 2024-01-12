async function fetchData() {
  const url = "http://localhost:3000/players";
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
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const data = await fetchData();

  data.forEach((element) => {
    // Create the div element with Tailwind CSS classes
    var newDiv = document.createElement("div");
    newDiv.classList.add(
      "pt-4",
      "flex",
      "flex-row",
      "ml-10",
      "mr-16",
      "mt-2",
      "mb-4",
      "w-3/5",
      "rounded-lg",
      "justify-between",
      "items-center",
      "inline-block",
      "bg-zinc-200"
    );

    // Create and append the child elements
    var playerNameDiv = document.createElement("div");
    playerNameDiv.classList.add("ml-20");
    playerNameDiv.textContent = element.name;
    newDiv.appendChild(playerNameDiv);

    var teamDiv = document.createElement("div");
    teamDiv.classList.add("ml-20", "mr-20");
    teamDiv.textContent = element.club;
    newDiv.appendChild(teamDiv);

    var addButtonDiv = document.createElement("div");
    addButtonDiv.classList.add("mr-20");

    var addButton = document.createElement("input");
    addButton.setAttribute("type", "submit");
    addButton.setAttribute("value", "Add");
    addButton.classList.add(
      "bg-zinc-400",
      "rounded-lg",
      "p-2",
      "text-white",
      "hover:bg-zinc-500",
      "md:p-2"
    );

    addButton.dataset.playerId = element._id;

    addButton.addEventListener("click", () => {
      async function getPlayerData(playerId) {
        const url = `http://localhost:3000/players/${playerId}`;
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Include Content-Type if needed
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
          console.error("Error:", error);
        }
      }
      console.log("added");
      addButton.value = "Player Is Added";
      addButton.disabled = true;
      addButton.style.color = "white";
      addButton.style.backgroundColor = "green";
      getPlayerData(addButton.dataset.playerId);
    });
    addButtonDiv.appendChild(addButton);
    newDiv.appendChild(addButtonDiv);

    // Append the newly created div to the existing content
    var dynamicContent = document.getElementById("root");
    dynamicContent.appendChild(newDiv);
  });
});
