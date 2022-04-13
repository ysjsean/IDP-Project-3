# IDP-Project-3

## Technologies Used

<b>React</b> - Frontend Web framework <br/>
<b>Typescript</b> - Static typing add on to javascript <br/>
<b>ANTD Design</b> - Component library for React <br/>
<b>Font Awesome</b> - Icons Library <br/>
<b>Java</b> - Android App <br/>
<b>Node.js / Express</b> - REST API server <br/>

## Setup Development Environment

#### Development Dependencies

Make sure you have Node (>= v10.19.0) and NPM (>= v6.13.4) installed in your local machine.
Clone to your local directory using the command `git clone <git repoo url here>`

#### Web App

1. Go to the directory of where you clone the repo
2. Go to QuestionatorProjectWeb and run `npm install`
3. Go to src/pages and open endpoints.ts to change the url IP address to your local IP
4. Run the command `npm start`
5. Open your browser (should be done automatically for you) and go to [http://localhost:3000](http://localhost:3000) to view
6. Make sure your Web App is in the same network as your server

#### Server

1. Go to the directory of where you clone the repo
2. Go to rest_server_mysql and run `npm install`
3. Run the command `npm start`
4. Server should start at [http://localhost:8001](http://localhost:8001) to view
5. Import the questionator.sql into your MySQL Workbench to view the database structure

#### Android App

1. Go to the directory of where you clone the repo
2. Go to QuestionatorProject
3. Go to res/values and open strings.xml to change the url IP address to your local IP
4. Start your emulator or download into your android phone
5. Make sure your phone is in the same network as your server
