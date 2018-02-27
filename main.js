const { PWCracker } = require('./lib/pwcracker');

const main = () => {
  const pwc = new PWCracker('./corpus');

  pwc.createTable().then(() => console.log(pwc.rainbow.size()));
};

main();
