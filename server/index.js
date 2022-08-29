const server = require('./app.js');
const port = 8000;
module.exports = server.listen(port, () => {
  console.log('server has started on port ' + port);
});