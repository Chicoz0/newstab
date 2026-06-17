import database from "infra/database.js";

async function status(request, response) {

  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = await databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = await databaseMaxConnectionsResult.rows[0].max_connections;

  // pg_stat_activity is a system view that shows information about the current database connections
  // pg_stat_database is a system view that shows information about the current databases
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
});
  const databaseOpenedConnectionsValue = await databaseOpenedConnectionsResult.rows.length;

  response.status(200).json({ 
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue
      }
    }  
});
}

export default status;