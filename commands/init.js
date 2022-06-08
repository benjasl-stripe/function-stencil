

const program = require('commander')
const ora = require('ora')
//const download = require('download-git-repo')
const options = require(`${__dirname}/../template`)

const symbols = require('log-symbols')
const chalk = require('chalk')
const inquirer = require('inquirer')
const copydir = require('copy-dir');
const highlight = require('cli-highlight').highlight
const highlightAuto = require('cli-highlight').highlightAuto
const path = require('path');
const fs = require('fs');
const { exit } = require('process')



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

  inquirer.prompt(getTemplateQuestions(answers)).then((templateAnswers) => {
    answers.template = templateAnswers.template

        
    console.log('\n Ready to go:');
    console.log(JSON.stringify(answers, null, '  '));
    


    if (answers.length < 1) return program.help()

    let runtimeName = answers.runtime.replace(/\s/g, '')
    let projectName = answers.name.replace(/\s/g, '')
    let templateName = answers.template.replace(/\s/g, '')
    let templateFileName=''
    let templateFolderName=''


    if (!options.runtimes.includes(runtimeName)) {
      console.log(chalk.red('\n Runtime option does not exit! \n '))
      return
    }
    if (!projectName) {
      console.log(chalk.red('\n Project should not be empty! \n '))
      return
    }

    console.log(templateName);
    //if(templateName.includes('cdk')){
    //  templateName = templateName.replace(' - ', '/')
    //}

    console.log("templateName="+templateName);    
    console.log(templateName.startsWith('cdk'));
    
    if (templateName) {

      switch (templateName) {
        case 'sam':
          templateFileName = 'template.yaml'
          break;
        case 'terraform':
          templateFileName = 'main.tf'
          break;
        case templateName.startsWith('cdk') ? templateName : '' :
          templateFolderName = templateName.replace('-', '/')
          break;
        default:
          templateFileName = 'template.yaml'
          break;
      }
    }

    //let url = templateList[runtimeName]
    console.log(chalk.green('\n Generating function files... \n'))
    const spinner = ora("Downloading...");
    spinner.start();
    copydir(path.join(__dirname,`../functions/${runtimeName}`) , `./${projectName}`,
    async function(err){
      if(err){ 
        console.log(chalk.red(`\n${symbols.error}`), chalk.red(`OOPS! ${err}`)) 
        process.exit(1);
        }
      spinner.succeed();
      console.log(chalk.green(symbols.success), chalk.green('Generation completed!'))
      

      if(templateFileName){
        console.log('FILE');

        console.log(`\n Copy the following ${templateName} definition onto the resource block of your ${templateFileName} file:`)


        let template =  fs.readFileSync(path.join(__dirname,`../templates/${runtimeName}/${templateName}/${templateFileName}`), 'utf8', (err,resultdata)=> {
          if (err) {
            return console.log(err);
          }
          return data
        });
  
        template = template.replace(/projectName/g, projectName)
        template = template.replace(/runtimeName/g, runtimeName)
  
        
        let log =`\n       
        ${template.replace('/projectName/g', projectName).replace('/runtimeName/g', runtimeName)}
        \n`
        console.log(highlight(log, {language: 'yaml', ignoreIllegals: true}))


      }else{
        console.log('FOLDER');

        //console.log(`\n Copy the following ../templates/${templateFolderName} folder definition to your ${projectName} folder:`)

        console.log(chalk.green('\n Generating function files... \n'))
        const spinner = ora("Downloading...");
        spinner.start();

        
        copydir(path.join(__dirname,`../templates/${templateFolderName}`) , `./${projectName}`, 
        async function(err){
          if(err){ 
            console.log(chalk.red(`\n${symbols.error}`), chalk.red(`OOPS! ${err}`)) 
            process.exit(1);
            }
          spinner.succeed();
          console.log(chalk.green(symbols.success), chalk.green('Generation completed!'))
          
          let stackName =  fs.readFileSync(path.join(__dirname,`../${projectName}/bin/project.ts`), 'utf8', (err,resultdata)=> {
            if (err) {
              return console.log(err);
            }
            return data
          });

          //console.log(stackName);
          stackName = stackName.replace(/projectName/g, 'eeeeeee')
          //console.log(stackName);

          let log =`\n       
          ${stackName.replace('/projectName/g', projectName)}
          \n`
          console.log(highlight(log, {language: 'yaml', ignoreIllegals: true}))

          console.log('done 2');
          
        });

        //template = template.replace(/runtimeName/g, runtimeName)



      }
      

      console.log('\n To get started')
      console.log(`\n    cd ${projectName} \n`)
    });


  })
})

function getTemplateQuestions(answers) {
    const templateList = answers.templateList
    var templateOptions = fs.readdirSync( `${__dirname}/../templates/${answers.runtime}` )
    const templeArray =[]
    templateOptions.forEach(folder => {
      if (path.extname(folder) != ".DS_Store")
          templeArray.push(folder);
    });

    templateOptions = fs.readdirSync( `${__dirname}/../templates/cdk` )
    templateOptions.forEach(folder => {
      if (path.extname(folder) != ".DS_Store")
          templeArray.push('cdk - ' + folder);
    });

    console.log(templeArray);

    const templateQuestions = []
        templateQuestions.push(
            {
                type: "list",
                name: `template`,
                choices: templeArray,
                message: `Choose one of the following templating languages for this runtime`
            }
        )
    
    return templateQuestions
}
