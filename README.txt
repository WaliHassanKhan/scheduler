TECHNOLOGIES : 

NodeJs
JSON
MongoDB Atlas
JQUERY
HTML
CSS
Bootstrap


PROJECT REQUIREMENTS : 


This is a very simple web application which handles appointments.

The appointments are stored in a MongoDB Atlas (cloud database) containing two attributes.

(1) a date-time column which records the appointment's time and (2) a description column.

The back-end is a node's server which handles requests
from the browser.  There are 3 types of requests which the server
 handles:

1. If no parameters are passed to the back-end the HTML document is sent to the client.

2. If any of the AJAX parameters are provided, then this request is
   considered to be an AJAX call and the server renders the results
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

The appointments area is initially empty. The document's jQuery DOM
ready function will contain a call to a Javascript
getAppointments() function.

The Javascript getAppointments() function populates the appointments
area (the DOM above). getAppointments() will accept an optional search string.
getAppointments() issues an AJAX 'getAppointments' call to the back-end,
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
button, the appointments area should clear and getAppointments() should
be called with text from the search box.  If the search text box is empty
when the SEARCH button is clicked, then ALL of the appointments should appear.
This should dynamically refresh the Table DOM, and not refresh the entire page.

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

The hidden form should include a "CANCEL" button.  If the "CANCEL" button is
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
form should be submitted to the back-end.  The JQuery script updates the page accordingly.
