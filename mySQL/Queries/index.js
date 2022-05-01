module.exports = {
  selectUserCount: function (email, password) {
    return `SELECT count(*) as count
                      FROM users
                          WHERE email LIKE "${email}" AND password="${password}"`;
  },

  insertUser: function (email, username, password) {
    return `INSERT INTO users (email, username, password) 
      VALUES ("${email}", "${username}", "${password}");`;
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
    return `SELECT * FROM users WHERE email= "${origin_email}" AND password= "${password}"`;
  },

  addToken: function (token) {
    return `INSERT INTO users (token) VALUES ("${token}")`;
  },
};
