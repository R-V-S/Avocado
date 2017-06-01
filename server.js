const express = require('express'),
      app = express(),
      port = process.env.PORT || 4000;

app.use('/', express.static('app'));
app.listen(port, function () {
  console.log(`Server is running! Open up http://localhost:${port} to view your site`);
});