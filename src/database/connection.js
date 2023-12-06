var config = require("./bdconfig");
const sql = require("mssql");

let connectionDB = null;

async function handleConnection() {
  console.log("sql server conectando...");
  connectionDB = await sql.connect(config)
    .then(c => {
      console.log("sql server conectado!");
      return c;
    })
    .catch(err => {
      throw new Error("ERRO in sql server: " + err);
    })

  return connectionDB;
}

function getConnection() {
  if(connectionDB != null && connectionDB.connected)
    return connectionDB;

  return handleConnection();
}

module.exports = getConnection;