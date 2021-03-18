const inquirer = require('inquirer');
const { identity } = require('rxjs');
//const fs = require('fs');
//const generatePage = require('./src/page-template')
//
//const pageHTML = generatePage(name,github);
//
//fs.writeFile('./index.html', pageHTML, err => {
//    if(err) throw err;
//
//    console.log('Portfolio complete! index.html');
//});

//collects data about the user. 
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }, 
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub Username?'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

//Collects data about a project
const promptProject = portfolioData => {
   //creates array if it does not already exist. 
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    };

    console.log(`
    =================
    Add a New Project
    =================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of you project?'
        }, 
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project. (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        }, 
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project.(Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);

        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
