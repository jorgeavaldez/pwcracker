const { PWCracker } = require('./lib/pwcracker');

const main = () => {
  const pwc = new PWCracker('./corpus');

  return pwc.createTable()
    .then(() => {
      console.log(`Table size: ${pwc.rainbow.size()}\nTable collisions: ${pwc.rainbow.collisions}`);
      return pwc.crackFile('../hashes.txt');
    }).then((cracked) => {
      console.log(JSON.stringify(cracked, null, 2));
    });
};

main();
