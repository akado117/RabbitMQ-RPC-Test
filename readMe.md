### Brief Summary of project intent

A scaleable solution to handle stiching together several different services with highly eratic response times.

### Data Flow

- Client sends down data(name) to client server and gets response if adding message to queue was a success
- Load balancer between RabbitMQ server and both Client Server and Work Server
- Name and UUID for user is now in queue (driverInfo) [available queues - driverInfo, ssnInfo, drivingRecord]
- Worker server pulls data from queues and processes it. Each processing event will call to an external service (FakeServer) with varying time delays. Upon success, store the data in our fake data warehouse (can be swapped for a DB later). Finally it will add the next services dependant data to the next queue
-This entire time, the inital success kicks off a 2 second heart beat on the frontend that will query the client server to check for new data. It sends this data to the client (in a real world example only send data when time limit reached or has sucessfully gotten all data. Otherwise send waiting response) Data is sent every time because its pretty cool to watch the services complete and populate the frontend.

### Quick Start
- Clone Repo `~ git clone https://github.com/akado117/RabbitMQ-RPC-Test.git`
- Cd into repo
- Run `npm install`
- Open 4 terminals and run one of the following in each (order does not matter) `npm run start:frontendServ; npm run start:fakeServ; npm run start:clientServ; npm run start:workServ`
- It should autolaunch a browser window. Enter a name and hit submit, then patiently wait for the results. You should see something within 10 seconds.

### Final Notes
This was a project researched and finished in one evening. No tests, some sleep deprevation mistakes, and a lot OMG IT WORKED MOMENTS. Was really fun picking up something alien to me and getting something tangible working so fast. Password/url to a free instance of a rabbitMQ instance is included in plain text within. Please dont nuke the poor bunny, less the killer bunnies from Monty Python's: The Holy Grail come after you.