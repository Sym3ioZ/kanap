# Kanap #

This is the front end and back end server for Project 5 of the Web Developer path.

Back end Prerequisites
You will need to have Node and npm installed locally on your machine.

Back end Installation
Clone this repo. From the "back" folder of the project, run npm install. You can then run the server with node server. The server should run on localhost with default port 3000. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. Listening on port 3001.

### Benoit TORTEVOIS --- 05/2022 ###

Worked only in javascript for this project. On front-end.
Edited 4 scripts to:
- Display products dynamically on homepage
- Display one product on product page, let choose color and quantity, and add to cart
- Display cart summary, with possiblity to modify quantity or delete each product. Total quantity and price displayed in real-time
- Form with veryfied inputs (via regex). Submit button, that makes one final check before sending data to API.
- Confirmation page displays the order id returned by API.