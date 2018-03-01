const fs = require('fs');

/**
 * Writes the given object to the given filename in the format required by the * lab.
 * @param {Object} o - The object we're writing.
 * @param {string} filename - The file to write o to.
 */
const writeObject = (o, filename) => {
  return new Promise((yes, no) => {
    const ks = Object.keys(o);
    const ostr = ks.reduce((lines, k) => {
      return [...lines, `${k}:${o[k] ? o[k] : ''}`];
    }, []).join('\n');

    fs.writeFile(filename, ostr, (err) => {
      if (err) no(err); 
      else yes();
    });
  });
};

module.exports = {
  writeObject
};