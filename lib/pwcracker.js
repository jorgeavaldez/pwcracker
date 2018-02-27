const crypto = require('crypto');
const Hashtable = require('hashtable');
const { parseFile, parseFiles } = require('./fileparser');

/**
 * Returns a sha256 hash of msg
 */
const createHash = (msg) => {
  return crypto
    .createHash('sha256')
    .update(msg)
    .digest('hex');
};

/**
 * Represents a rainbow table. Holds an internal object with hashes as the key
 * and the cleartext password as the value.
 */
class RainbowTable {
  constructor() {
    this.table = new Hashtable();
    this.collisions = 0;
  }

  /**
   * Sets the hash:password pair within the table. If the hash exists,
   * returns an object with an error key and associated parameters.
   */
  set(hash, password) {
    if (this.table.has(hash) && this.table.get(hash) === password) {
      this.collisions++;
    }

    if (this.table.has(hash)) {
      this.collisions++;
    }

    this.table.put(hash, password); 
    return {
      hash,
      password
    };
  }

  /**
   * Returns the password associated with hash.
   */
  get(hash) {
    return this.table.get(hash);
  }
}

/**
 * Object that handles cracking password hashes using a rainbow table. 
 */
class PWCracker {
  /**
   * corpusPath is the path to the corpus of password files for use in
   * construction of the rainbow table.
   */
  constructor(corpusPath) {
    this.corpusPath = corpusPath;
    this.rainbow = new RainbowTable();

    this.cracked = {};
  }

  /**
   * Begins parsing and creation of the rainbow table.
   * Returns a promise.
   */
  createTable() {
    return parseFiles(this.corpusPath, 
      (line) => {
        const pw = line.trim();
        const hash = createHash(pw);
        const res = this.rainbow.set(hash, pw);
      });
  }

  /**
   * Parses the file of hashes at filepath and attempts to find the associated
   * passwords. Returns a promise with the dictionary of cracked passwords.
   * @param {string} filepath - filepath of a file of hashes.
   * @returns {Promise<Object>} - a promise resolving to an object of cracked
   * passwords
   */
  crackFile(filepath) {
    return parseFile(filepath, (line) => {
      // check if the rainbow table has line
      if (this.rainbow.has(line)) {
        const hash = line.trim();
        this.cracked[hash] = this.rainbow.get(hash);
      }
    }).then(() => {
      return this.cracked;
    });
  }
}

module.exports = {
  createHash,
  RainbowTable,
  PWCracker
};
