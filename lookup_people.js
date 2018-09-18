const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
const famous_people = process.argv[2];
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1" , [famous_people], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`found '${result.rows.length}' person(s) by the name '${famous_people}'`);

    result.rows.forEach(x => {
    const final = `- ${x.id}, ${x.first_name} ${x.last_name}, born '${x.birthdate.toLocaleString().slice(0,-9)}'`
    console.log(final);
  })
    client.end();
  });
});