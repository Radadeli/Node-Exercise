import pgPromise from "pg-promise";

const initOptions = {
    // global event notification;
    error: (error: any, e: any) => {
      if (e.cn) {
        // A connection-related error;
        //
        // Connections are reported back with the password hashed,
        // for safe errors logging, without exposing passwords.
        console.log('CN:', e.cn);
        console.log('EVENT:', error.message || error);
      }
    },
  };
  
  const pgp = pgPromise(initOptions);
  
  // Utiliza la configuración de la base de datos al configurar pgp
  const databaseConfig = {
    "host": "localhost",
    "port": 5432,
    "database": "postgres",
    "user": "postgres",
    "password": "12345", // Reemplaza con tu contraseña
  };
  
  const db = pgp(databaseConfig);
  
  const setupDb = async () => {
    await db.none(`
      DROP TABLE IF EXISTS planets;
      CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
      );

      DROP TABLE IF EXITS users;

      CREATE TABLE users{
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL, 
        token TEXT 
      }
    `);
  
    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
    await db.none(`INSERT INTO users (username, password) VALUES ('dummy', 'dummy')`);

    const planets = await db.many(`SELECT * FROM planets`);
    console.log(planets);
  };
  
  setupDb();

  export { db };