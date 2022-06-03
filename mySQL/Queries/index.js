module.exports = {
  selectUserCount: function (email) {
    return `SELECT count(*) as count
                      FROM users
                          WHERE email LIKE "${email}"`;
  },

  getUserIdFromToken: function (token) {
    return `SELECT user_id
                    FROM tokens
                        WHERE token LIKE "${token}"
                          LIMIT 1`;
  },

  addUserRecord: function (email, username) {
    return `INSERT INTO users (email, username) 
      VALUES ("${email}", "${username}")`;
  },

  insertUserPassword: function (user_id, password) {
    return `INSERT INTO login (user_id, hash_password) VALUES ("${user_id}","${password}")`;
  },

  updateEmail: function (origin_email, email) {
    return `UPDATE users SET email= "${email}" 
      WHERE email like "${origin_email}"`;
  },

  // updatePassword: function (origin_email, password) {
  //   return `UPDATE login SET hash_password= "${password}"
  //                  WHERE email= "${origin_email}"`;
  // },

  updatePassword: function (origin_email, password) {
    return `UPDATE login SET hash_password= "${password}"
              WHERE email IN (
                SELECT email
                  FROM users
                    WHERE email="${origin_email}"`;
  },

  updateUsername: function (origin_email, newUsername) {
    return `UPDATE users SET username= "${newUsername}"
              WHERE email= "${origin_email}"`;
  },

  deleteUser: function (token) {
    return `DELETE FROM users WHERE token= "${token}"`;
  },

  getUser: function (token) {
    return `SELECT user_id, email, username FROM tokens
              JOIN users
                ON tokens.user_id = users.id
                  WHERE token= "${token}"`;
  },

  login: function (origin_email, password) {
    return `SELECT users.id FROM users
                  JOIN login
                    ON users.id = login.user_id
                      WHERE email LIKE "${origin_email}" AND hash_password LIKE "${password}"
                        LIMIT 1`;
  },

  addToken: function (user_id, token) {
    return `INSERT INTO tokens (user_id, token) VALUES ("${user_id}", "${token}")`;
  },

  logout: function (token) {
    return `DELETE FROM tokens WHERE token= "${token}"`;
  },
};
