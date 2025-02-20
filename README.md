# Model Loco Database

Simple ReactJS + Express project, to help keep a track of my collection of model trains.

## Planned Features

 - Add, Edit, Delete trains from a database
 - Show information about the train i.e. Whyte notation, Manufacturer, Livery
 - Show DCC Status and Address for easier running
 - Connect to manufacturers/external databases to prefill information
 - Docker implementation for easy deployment

## Technical Details

### Requirements

 - Node: >= 22

### Running in Dev mode

1. Clone the repo.
2. Navigate to the repo's folder on your system.
3. Run `npm install` to install dependancies.
4. Run `npm start` to start the dev server.

The site will then be available on `http://127.0.0.1:3000`.

This project uses Nodemon and Webpack Dev Server to reload the server/front-end respectively when files are changed.

### Build the project

Repeat steps 1 - 3 as above, then run `npm run build`. This will compile a `bundle.js` file in the `public` folder.

