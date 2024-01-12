async function getUser(url) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

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
    console.error("Error during GET request:", error.message);
    throw error;
  }
}

function createPlayerEntry(playerId, playerName, teamName) {
  console.log("Function called");
  // Create elements
  const playerEntryDiv = document.createElement("div");
  const playerNameDiv = document.createElement("div");
  const teamNameDiv = document.createElement("div");

  // Set attributes and classes
  playerEntryDiv.classList.add(
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
  playerNameDiv.classList.add("ml-20");
  teamNameDiv.classList.add("ml-20", "mr-20");

  playerNameDiv.textContent = playerName;
  teamNameDiv.textContent = teamName;

  playerEntryDiv.appendChild(playerNameDiv);
  playerEntryDiv.appendChild(teamNameDiv);
  console.log(playerEntryDiv);

  let toRoot = document.getElementById("root");
  toRoot.appendChild(playerEntryDiv);
}

const apiUrl = "http://localhost:3000/players/team";

getUser(apiUrl)
  .then((data) => {
    console.log("Data received:", data);
    data.forEach((element) => {
      createPlayerEntry(element._id, element.name, element.club);
    });
  })
  .catch((error) => {
    console.error("Error in fetch operation:", error.message);
  });
