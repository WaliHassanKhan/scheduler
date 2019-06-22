HEROKU:
The app is deployed on Heroku. Use the link below to access the website.
https://walis-scheduler.herokuapp.com/

EXTRA:
**Run command "node populate.js" to repopulate the database to default entries.**



HOW TO RUN APPLICATION ON YOUR LOCAL MACHINE

Steps:

1 Install Nodejs on your local machine

2 open terminal/command prompt in the destination folder

3 type “npm start” to run the application

4 use Chrome browser to visit “localhost:8080” 



PROJECT INFO:


TECHNOLOGIES : 

NodeJs
JSON
MongoDB Atlas
JQUERY
HTML
CSS
Bootstrap


PROJECT INFORMATION : 


This application handles appointments.

The appointments are stored in a MongoDB Atlas (cloud database) containing two attributes.

(1) a date-time attribute which records the appointment's time and date (2) a description column.

The back-end is a node's server which handles requests
from the browser.  There are 3 types of requests which the server
 handles:

1. If no parameters are passed to the back-end the HTML document is sent to the client.

2. If any of the AJAX parameters containing search description, then this request is
   considered to be an AJAX call and the server sends the results
   as a JSON document. The JQuery script updates the page accordingly.

3. If this is a form submission, the server will add a NEW
   appointment to the database using the values from the HTML form.
   The JQuery script updates the page accordingly.

The frontend is a single web page which displays a "NEW" button, an
empty text field with a "SEARCH" button and the bottom of the page will
be an (initially empty) area for displaying the appointments in a table.

	=============================================
	=  +---+
	=  |NEW|
	=  +---+
	=  
	=  +-------------------+  +------+
	=  |                   |  |SEARCH|
	=  +-------------------+  +------+
	=
	=  <appointments table will be here>
	=============================================

The appointments area is initially empty. The document's jQuery function will call the provided API to get the appointments from the server.

The function then populates the appointments
table . The function will accept an optional search string.
The function issues an AJAX call to the back-end,
passing the optional search string. The back-end will reply with a JSON
document containing the matching appointments, and the front-end will use the
resulting JSON object to render the data into the HTML <table> element.  
The resulting HTML is inserted into the DOM so that the <table> appears below the search box.

	==============================================
	=  
	=  +---+
	=  |NEW|
	=  +---+
	=  
	=  +-------------------+  +------+
	=  |                   |  |SEARCH|
	=  +-------------------+  +------+
	=  
	=  +-------+---------+----------------+
	=  | DATE  | TIME    | DESCRIPTION    |
	=  +-------+---------+----------------+
	=  | May 2 | 11:00am | Something      |
	=  | May 2 | 12:00pm | Something else |
	=  | May 4 |  8:00am | Meet foo       |
	=  +-------+---------+----------------+
	=  
	==============================================

If the user enters text into the search text box and hits the SEARCH
button, or presses enter the JQuery function is activated. If the search text box is empty
when the SEARCH button is clicked, then ALL of the appointments appear.
This dynamically refreshes the Table DOM, and does not refresh the entire page.

	==============================================
	=  
	=  +---+
	=  |NEW|
	=  +---+
	=  
	=  +-------------------+  +------+
	=  | Something         |  |SEARCH|
	=  +-------------------+  +------+
	=  
	=  +-------+---------+----------------+
	=  | DATE  | TIME    | DESCRIPTION    |
	=  +-------+---------+----------------+
	=  | May 2 | 11:00am | Something      |
	=  | May 2 | 12:00pm | Something else |
	=  +-------+---------+----------------+
	=  <notice only the rows containing "Something" appear>
	==============================================

The page also contain a hidden form which contains fields for
adding a new appointment to the database.  Pressing the "NEW" button
changes the "NEW" button to "ADD" and shows the hidden form.

The hidden form include a "CANCEL" button.  If the "CANCEL" button is
pressed, the form is hidden and the "ADD" button becomes "NEW" again.

	==============================================
	=  
	=  +---+ +------+
	=  |ADD| |CANCEL|
	=  +---+ +------+
	=  
	=       +--------------------+
	=  DATE |                    |
	=       +--------------------+
	=       +--------------------+
	=  TIME |                    |
	=       +--------------------+
	=       +--------------------+
	=  DESC |                    |
	=       +--------------------+ 
	=  
	=  +-------------------+  +------+
	=  |                   |  |SEARCH|
	=  +-------------------+  +------+
	=  
	=  +-------+---------+----------------+
	=  | DATE  | TIME    | DESCRIPTION    |
	=  +-------+---------+----------------+
	=  | May 2 | 11:00am | Something      |
	=  | May 2 | 12:00pm | Something else |
	=  | May 4 |  8:00am | Meet foo       |
	=  +-------+---------+----------------+
	=  
	==============================================

When data is entered into the form and the "ADD" button is pressed, the
form is submitted to the back-end.  The JQuery script updates the page accordingly.

The entries are sorted based on Time and Date.

UPDATE: A delete button has been added to the website for removing any single entry.