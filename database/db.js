const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  user: "andrewsmacbook",
  port: 5432,
  password: "root",
  database: "products"
});

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected to postgres');
  }
});

module.exports = client;