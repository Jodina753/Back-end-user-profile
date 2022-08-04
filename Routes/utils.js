const fs = require("fs");
module.exports = {
  getUniqueId: function () {
    let uniqueId = "";

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

    let charsLength = chars.length;

    for (let i = 0; i < 32; i++) {
      uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return (uniqueId += Date.now());
  },

  addToLog: function (headers) {
    const str = `New request ${new Date().toString()} ${JSON.stringify(
      headers
    )}`;

    const fileName = `./Logs/${new Date().getFullYear()} ${new Date().getMonth()}`;

    fs.appendFile(fileName + ".txt", str, (err) => {
      if (err) {
        return console.log("An error occurred");
      }
    });
  },
};
