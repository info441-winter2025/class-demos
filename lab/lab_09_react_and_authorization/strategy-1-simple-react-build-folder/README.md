Instructions for lab 9 Strategy 1 setup:

Essentially this strategy is just copying the front-end react code to the backend serverside code every single time a request or something gets changed in terms of front end.

1. create backend and frontend folder for better organization
2. navigate to backend folder and do the normal serverside, express set up (import the express starter code, or npm init, npm install express, etc.)
3. navigate to the frontend folder and paste react/frontend code into it
4. `npm run build` to build the frontend/react code (write all your frontend changes here)
5. copy over all the react frontend `/build` folder/code (static code, not responsive ones) into the server side public folder
6. write the server side code like we did in class, but using the react front end code now
7. Repeat steps everytime you want to change front-end code
