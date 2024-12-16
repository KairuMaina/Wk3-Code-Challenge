document.addEventListener("DOMContentLoaded", function() {
  // Fetch films data from db.json
  fetch('http://localhost:5500/db.json')
    .then(response => response.json())
    .then(data => {
      const films = data.films; // Films array from the response
      const filmsList = document.getElementById("films");

      // Function to render films
      function displayFilms(filmsToDisplay) {
        filmsList.innerHTML = ''; // Clear current list
        filmsToDisplay.forEach(film => {
          const filmItem = document.createElement("li");
          filmItem.classList.add("film-item");

          filmItem.innerHTML = `
            <img src="${film.poster}" alt="${film.title} Poster" />
            <p>${film.title}</p>
          `;

          // When a movie is clicked, display its details
          filmItem.addEventListener("click", () => {
            showFilmDetails(film);
          });

          filmsList.appendChild(filmItem);
        });
      }

      // Function to display film details when a movie is clicked
      function showFilmDetails(film) {
        document.getElementById("poster").src = film.poster;
        document.getElementById("title").textContent = film.title;
        document.getElementById("runtime").textContent = `Runtime: ${film.runtime} minutes`;
        document.getElementById("showtime").textContent = `Showtime: ${film.showtime}`;
        document.getElementById("tickets-available").textContent = `Tickets Available: ${film.capacity - film.tickets_sold}`;
        document.getElementById("description").textContent = film.description;

        const buyTicketBtn = document.getElementById("buy-ticket-btn");
        
        // Disable the "Buy Ticket" button if sold out
        buyTicketBtn.disabled = film.tickets_sold >= film.capacity;

        // Add event listener for the Buy Ticket button
        buyTicketBtn.onclick = function() {
          if (film.tickets_sold < film.capacity) {
            film.tickets_sold++;
            document.getElementById("tickets-available").textContent = `Tickets Available: ${film.capacity - film.tickets_sold}`;

            // Disable the button if sold out
            if (film.tickets_sold >= film.capacity) {
              buyTicketBtn.disabled = true;
            }
          }
        };
      }

      // Initially display all films
      displayFilms(films);

      // Listen for search input
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase(); // Get search query and convert to lowercase
        const filteredFilms = films.filter(film => film.title.toLowerCase().includes(query)); // Filter films based on the title
        displayFilms(filteredFilms); // Display filtered films
      });

      // Automatically show the details of the first movie when the page loads
      if (films.length > 0) {
        showFilmDetails(films[0]);
      }
    })
    .catch(error => console.error("Error fetching film data:", error));
});
