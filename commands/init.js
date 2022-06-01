

const program = require('commander')
const ora = require('ora')
//const download = require('download-git-repo')
const options = require(`${__dirname}/../template`)
const symbols = require('log-symbols')
const chalk = require('chalk')
const inquirer = require('inquirer')
const copydir = require('copy-dir');
const highlight = require('cli-highlight').highlight
const path = require('path');



chalk.level = 1


console.log('lets get you a Lambda function!');

const questions = [
  
  {
    type: 'list',
    name: 'runtime',
    message: 'What runtime do you need?',
    choices: options.runtimes,
    filter(val) {
      return val.toLowerCase();
    },
  },
  
 
  {
    type: 'input',
    name: 'name',
    message: 'What\'s the function name?',
    default: 'exampleFunction',
  },
  
];

   inquirer.prompt(questions).then((answers) => {
    console.log('\n Ready to go:');
    console.log(JSON.stringify(answers, null, '  '));
    


if (answers.length < 1) return program.help()

let templateName = answers.runtime
let projectName = answers.name

if (!options.runtimes.includes(templateName)) {
  console.log(chalk.red('\n Runtime option does not exit! \n '))
  return
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n '))
  return
}

//let url = templateList[templateName]
//console.log(url)

console.log(chalk.green('\n Start generating... \n'))

const spinner = ora("Downloading...");
spinner.start();

copydir(path.join(__dirname,`../functions/${templateName}`) , `./${projectName}`,

function(err){
  if(err){ 
     console.log(chalk.red(`\n${symbols.error}`), chalk.red(`OOPS! ${err}`)) 
     process.exit(1);
    }
  spinner.succeed();
  console.log(chalk.green(symbols.success), chalk.green('Generation completed!'))
  console.log('\n Copy the following SAM deffinition onto the resource block of your template.yaml:')
  let log =`\n      
  LambdaFunction${projectName}:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: ${projectName}/function/
      Handler: app.lambdaHandler
      Runtime: nodejs14.x
      Timeout: 3 \n`

  console.log(highlight(log, {language: 'yaml', ignoreIllegals: true}))
  console.log('\n To get started')
  console.log(`\n    cd ${projectName} \n`)
});










})

