Web app that displays the next 10 games and average ticket resale prices for all 30 MLB teams.

The backend is written in Node and services the frontend by taking the team name selected by the user, sending a data request to the SeatGeek API, and passing back the results. The frontend is written in Javascript and makes an AJAX call to the backend server, parsing and displaying the results as an HTML table.

To run, first spin up the backend server on your local machine using "node backend.js" and then open the html file in your web browser.
