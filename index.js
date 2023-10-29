const express = require('express');
const connection = require('./config/connection');
const mainMenu = require('./mainMenu');

const app = express();
const PORT = process.env.PORT || 3001;

// Start the application by displaying the main menu
mainMenu(app, connection);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
