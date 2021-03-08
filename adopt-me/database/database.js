const {Pool} = require('pg');
console.log("Succesful connection to the database in Postgres");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'david',
    port: 5432,
  });

  const getUsers = async function (){
      return pool.query('SELECT * FROM users').then(function({rows}) {
        // console.log("rows",rows);
        return rows;
      });
  };

  const insertIfNotExits = (user) => {
    return new Promise ((resolve, reject) =>{
      pool
      .query(`SELECT * from users WHERE id = ${user.id.substring(0,6)}`)
      .then(function ({rows}) {
        if(rows.length == 1) return resolve(rows[0]); //user already
        const ind = user.displayName.indexOf(" ");
        // console.log(ind)
        const name = user.displayName.substring(0, ind);
        // console.log(name);
        return pool.query(`INSERT INTO users (id, name) VALUES (${user.id.substring(0,6)}, '${name}') RETURNING *`);
      })
      .then(function ({rows}) {
        resolve(rows[0]);
      })
      .catch(function(error){
        reject(error);
      });
    });
  };

  const registerUser = (user) => {
    return insertIfNotExits(user)
    .then(function(user){
      return user;
    })
    .catch(function (error) {
      console.log(error);
      return {message: error.message, code: 500};      
    });
  };

  module.exports = {
      getUsers: getUsers,
      registerUser: registerUser
  }