document.addEventListener("DOMContentLoaded", () => {
    const filmsList = document.getElementById("films");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieDescription = document.getElementById("movie-description");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");

    // Fetch the list of films
    fetch('http://localhost:5000/films')
        .then(response => response.json())
        .then(movies => {
            // Populate the list of movies
            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.title;
                listItem.classList.add('film', 'item');
                listItem.addEventListener('click', () => showMovieDetails(movie));
                filmsList.appendChild(listItem);
            });

            // Display the details of the first movie when the page loads
            if (movies.length > 0) {
                showMovieDetails(movies[0]);
            }
        })
        .catch(error => console.error("Error fetching movies:", error));

    // Show movie details and available tickets
    function showMovieDetails(movie) {
        moviePoster.src = movie.poster;
        movieTitle.textContent = movie.title;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        movieDescription.textContent = `Description: ${movie.description}`;

        // Calculate available tickets
        const ticketsLeft = movie.capacity - movie.tickets_sold;
        availableTickets.textContent = `Available Tickets: ${ticketsLeft}`;

        // Enable or disable the "Buy Ticket" button based on availability
        if (ticketsLeft > 0) {
            buyTicketButton.disabled = false;
        } else {
            buyTicketButton.disabled = true;
        }

        // Store the current movie's data for the buy ticket functionality
        buyTicketButton.onclick = () => buyTicket(movie, ticketsLeft);
    }

    // Handle ticket purchase
    function buyTicket(movie, ticketsLeft) {
        if (ticketsLeft > 0) {
            // Simulate a ticket purchase by decrementing the available tickets
            const updatedTicketsLeft = ticketsLeft - 1;
            availableTickets.textContent = `Available Tickets: ${updatedTicketsLeft}`;

            // Disable the button if no tickets are left
            if (updatedTicketsLeft === 0) {
                buyTicketButton.disabled = true;
            }
        }
    }
});
