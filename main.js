const { PWCracker } = require('./lib/pwcracker');

const main = () => {
  const pwc = new PWCracker('./corpus');

  const printRainbowStats = () => {
    console.log(`SIZE: ${pwc.rainbow.size}\nCOLLISIONS: ${pwc.rainbow.collisions}`);
  };

  return pwc.createTable()
    .then(printRainbowStats)
    .then(() => pwc.crackFile('../hashes.txt'))
    .then(cracked => console.log(Object.keys(cracked).length))
    .catch((err) => console.log(err));
};

main();
