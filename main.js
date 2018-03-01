const { PWCracker } = require('./lib/pwcracker');

const chalk = require('chalk');
const yargs = require('yargs');

const main = ({ hashfile, outfile, corpus }) => {
  console.log(chalk.magenta(`Creating table using files in ${chalk.yellow(corpus)}`));

  const pwc = new PWCracker(corpus);

  const printRainbowStats = () => {
    console.log(chalk.green(`Rainbow table created!`))
    console.log(chalk.magenta(`SIZE: ${chalk.yellow('' + pwc.rainbow.size)}\nCOLLISIONS: ${chalk.yellow('' + pwc.rainbow.collisions)}`));

    console.log(chalk.magenta(`\nParsing hashfile ${chalk.yellow(hashfile)}`));
  };

  const processCracked = cracked => {
    const numCracked = '' + Object.keys(cracked).reduce(
      (sum, hash) => {
        if (cracked[hash]) return sum + 1;
        else return sum;
      }, 
      0);

    console.log(chalk.green(`Number of passwords cracked: ${chalk.yellow(numCracked)}`));

    console.log(chalk.magenta(`\nDumping cracked passwords to outfile ${chalk.yellow(outfile)}`));
    return pwc.writeCrackedToFile(outfile);
  };

  console.log(chalk.magenta('Creating rainbow table...'));
  return pwc.createTable()
    .then(printRainbowStats)
    .then(() => pwc.crackFile(hashfile))
    .then(processCracked)
    .catch((err) => console.log(err));
};

const args = yargs
  .usage('Usage: $0 <hashfile> <outfile> [options]')
  .command('<hashfile> <outfile>', 'parses given hashfile and dumps cracked passwords to outfile')
  .example('$0 hashes.txt passwords.txt -c ./corpus/')
  .alias('c', 'corpus')
  .nargs('c', 1)
  .describe('c', 'specify corpus directory')
  .default('c', './corpus/')
  .describe('hashfile', 'file of password hashes to crack')
  .default('hashfile', '../hashes.txt')
  .describe('outfile', 'output file of cracked passwords')
  .default('outfile', 'passwords.txt')
  .help('h')
  .alias('h', 'help')
  .epilog('Jorge Valdez javaldez@smu.edu CSE 3339')
  .argv;

main(args);