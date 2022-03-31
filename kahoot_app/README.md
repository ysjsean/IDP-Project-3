# Klass C2 Gui

## Technologies Used

<b>React</b> - Frontend framework<br />
<b>Typescript</b> - Static typing add on to javascript<br />
<b>ANTD Design</b> - Component library for React<br />
<b>Font Awesome</b> - Icons Library

## Setup Development Environment

#### Development Dependencies

Make sure you have Node (>= v10.19.0) and NPM (>= v6.13.4) installed in your local machine. You can view the guide [here](https://phoenixnap.com/kb/install-latest-node-js-and-nmp-on-ubuntu#htoc-install-node-js-and-npm-with-nvm) on how to install Node Version Manager (NVM).

Run `pip2 install python-dotenv flask flask-sqlalchemy flask-migrate flask-login` for to install dependencies for Backend Simulation.

#### Local Development

1. Clone to your local directory using the command `git clone <git repoo url here>`
2. Go to the directory of where you clone the repo and run `npm install`
3. Run the command `npm start`
4. Open your browser (should be done automatically for you) and go to [http://localhost:3000](http://localhost:3000) to view

#### Backend Simulation

1. Run `sudo chmod +x setup.sh && ./setup.sh` on the terminal. This will setup a fake ROS environment.
2. Run `flask run` on the terminal. This will simulate the backend on port `8001`.
3. Run `roslaunch rosbridge_server rosbridge_websocket.launch` on the terminal. This will launch a websocket for the communication with ROS.
4. [Optional] Run `./fake_ros/fake_ros.py` on the terminal (if you do not have klass_simulation). This will launch a fake ROS backend.

Note that this mode will connect to the database _dev_app.db_ ( under the current repository ).

**[Important]** Run `./test/reset.py` on the terminal to reset the database and maps in _app/_ before commit if something has been changed in database or maps folder.

## Project Structure

![Project Directory Structure](doc/project_structure.png)
<br /><br />
Most of the time, development work will on be folders and files labeled as purple and green respectively.

#### How To Add Pages

1. In the `/pages` directory, create a folder and create `index.tsx` in that folder
2. Write your React code in `index.tsx` and export the main page function via `export default <name of page function here>`
3. Navigate to `AppContent.ts`
   1. Import the page function which you have exported in 2)
   2. Import the necessary icon either from `@ant-design/icons`
   3. Create and append a new object in `AppContents` array with the following fields
      1. <b>jsx</b> - The page function
      2. <b>route</b> - The URL path where the page will reside
      3. <b>title</b> - The title of the page (Will render in the `<LayoutHeader />` and `<LayoutNav />` component)
      4. <b>icon</b> - The icon that you want it to appear beside the <b>title</b> in the `<LayoutNav />` component
4. If you have done it correctly, your page will appear in the desired URL with the `<LayoutHeader />` and `<LayoutNav />` populated with your new page

## Setup Production Environment

#### Start Web Server

1. Run `npm run build` to build the app for production in the `build` folder.
2. Run `gunicorn -b 0.0.0.0:5000 -w 4 klass_gui:app` to start web server.<br /><br />
   Note that this mode will connect to the database _app.db_ (under the klass_navigation repository).

#### Edit Configurations in `build` mode

1. Stop the web server.
2. Navigate to `/directory-to-repo/klass_gui/build/js/config.js`.
3. Use `NANO` or `VIM` to open the file in terminal.
4. After editing, save your changes.<br /><br />
   **DO NOT** add in new variables or edit they key in **PRODUCTION** mode. Only edit the values.
