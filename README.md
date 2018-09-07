# resource-booking-system
A system for adding, viewing and booking resources

API guide:

**/api-help**
GET all possible queries and paths

**/login**
POST login

**/bookings**
GET all bookings - Queries: bookingID, date, username

Example: 
/bookings/?bookingID=10 - GET booking with bookingID 10
/bookings/?date=2018-09-15 - GET all bookings at date 2018-09-15
/bookings/?username=testman - GET all bookings for user with username testman

POST new booking - posts HTTP-request with booking information in request.body.params

**/resources**
GET all resources - Queries: resourceID, date, category, tags

Example: 
/resources/?resourceID=101&date=2018-09-15 - GET resource 101 and all its bookings at date 2018-09-15
/resources/?category=room&date=2018-09-15 - GET all resources in category room and their bookings at 2018-09-15
