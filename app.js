document.addEventListener("DOMContentLoaded", function() {
  fetch('http://localhost:5500/db.json')
    .then(response => response.json())
    .then(data => {
      const films = data.films;
      const filmsList = document.getElementById("films");

      // Loop through the films array and add them to the HTML
      films.forEach(film => {
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

      // Automatically show the details of the first movie when the page loads
      if (films.length > 0) {
        showFilmDetails(films[0]);
      }

      // Function to display film details when a movie is clicked
      function showFilmDetails(film) {
        document.getElementById("poster").src = film.poster;
        document.getElementById("title").textContent = film.title;
        document.getElementById("runtime").textContent = `Runtime: ${film.runtime} minutes`;
        document.getElementById("showtime").textContent = `Showtime: ${film.showtime}`;
        document.getElementById("tickets-available").textContent = `Tickets Available: ${film.capacity - film.tickets_sold}`;
        
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
    })
    .catch(error => console.error("Error fetching film data:", error));
});
