module.exports = {
  selectUserCount: function (email, password) {
    return `SELECT count(*) as count
                      FROM users
                          WHERE email LIKE "${email}" AND password= "${password}"`;
  },

  getUserIdFromToken: function (token) {
    return `SELECT user_id
                    FROM tokens
                        WHERE token LIKE "${token}"`;
  },

  addUserRecord: function (email, username, password) {
    return `INSERT INTO users (email, username, password) 
      VALUES ("${email}", "${username}", "${password}");`;
  },

  insertUserPassword: function (user_id, password) {
    return `INSERT INTO login (user_id, hash_password) VALUES ("${user_id}","${password}")`;
  },

  updateEmail: function (origin_email, email) {
    return `UPDATE users SET email= "${email}" 
      WHERE email like "${origin_email}"`;
  },

  updateUsername: function (origin_email, origin_password, username) {
    return `UPDATE users SET username= "${username}" 
      WHERE email like "${origin_email}" AND password= "${origin_password}"`;
  },

  updatePassword: function (origin_email, origin_password, password) {
    return `UPDATE users SET password= "${password}" 
      WHERE password= "${origin_password}" AND email like "${origin_email}"`;
  },

  updateLocation: function (origin_email, origin_password, location) {
    return `UPDATE users SET location= "${location}" 
      WHERE password= "${origin_password}" AND email like "${origin_email}"`;
  },

  deleteUser: function (origin_email, origin_password) {
    return `DELETE FROM users WHERE email= "${origin_email}" AND password= "${origin_password}"`;
  },

  getUser: function (origin_email, password) {
    return `SELECT * FROM users WHERE email= "${origin_email}" AND password="${password}"`;
  },

  login: function (origin_email, password) {
    return `SELECT * FROM users WHERE email= "${origin_email}" AND hash_password= "${password}"`;
  },

  addToken: function (user_id, token) {
    return `INSERT INTO tokens (user_id, token) VALUES ("${user_id}", "${token}")`;
  },

  logout: function (token) {
    return `DELETE FROM tokens WHERE token= "${token}"`;
  },
};
