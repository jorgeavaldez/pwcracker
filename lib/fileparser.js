const fs = require('fs');
const path = require('path');
const eventStream = require('event-stream');

/**
 * Parses the file at filepath and calls the process callback
 * on each line. Returns a promise.
 */
const parseFile = (filepath, process) => {
  const stream = fs.createReadStream(filepath);

  return new Promise((yes, no) => {
    stream
      .pipe(eventStream.split('\n'))
      .pipe(eventStream.mapSync(
        line => {
          // pause the stream so we don't overflow
          stream.pause();
          process(line);
          stream.resume();
        })
        .on('error', err => no())
        .on('end', () => yes())
      );
  });
};

/**
 * Returns a promise containing a list of all the files in directory
 * or an error if it fails.
 */
const ls = (directory) => {
  return new Promise((yes, no) => {
    fs.readdir(directory, (err, files) => {
      if (err) no(err);
      else yes(files);
    });
  });
};

/**
 * Parses all files in directory and calls the process function
 * for each line. Returns a promise.
 */
const parseFiles = (directory, process) => {
  return ls(directory)
    .then((files) => {
      return Promise.all(
        files.map(file => 
          parseFile(path.join(directory, file), process)
        )
      );
    })
    .catch(err => {
      console.log(`Error processing files: ${err}`);
    });
};

module.exports = {
  ls,
  parseFile,
  parseFiles
};

