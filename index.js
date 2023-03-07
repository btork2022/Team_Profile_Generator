// Importing classes from respective files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer"); // Importing Inquirer for prompting questions in CLI
const path = require("path"); // Importing Path module to manipulate file path strings
const fs = require("fs"); // Importing file system module to perform file-related operations

// Setting output file path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Importing render function from page-template.js
const render = require("./src/page-template.js"); 

// Initializing an empty array for holding IDs of team members, 
// and another for holding objects of team members
const idList = [];
const teamMembers = [];

// Defining appMenu function for prompting questions to the user
const appMenu = () => {

    // Function for building the team by creating the output HTML file
    function buildTeam(){

        // If the output directory doesn't exist, create it
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        // Write the rendered HTML data to the output file
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    }

    // Function for adding an intern to the team
    function addIntern() {

        // Prompt the user for intern information
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter your intern's name:"
            },
            {
                type: "input",
                name: "internId",
                message: "Enter your intern's id:"
            },
            {
                type: "input",
                name: "internEmail",
                message: "Enter your intern's email:"
            },
            {
                type: "input",
                name: "internSchool",
                message: "Enter your intern's school:"
            }
        ]).then(answers => {

            // Create a new intern object with the answers provided by the user
            const intern = new Intern(
                 answers.internName,
                 answers.internId,
                 answers.internEmail, 
                 answers.internSchool);

            // Add the intern object to the teamMembers array
            teamMembers.push(intern);

            // Add the intern's ID to the idList array
            idList.push(answers.internId);

            // Call createTeam function to prompt the user for the next action
            createTeam();
        });
    }

    // Function for adding an engineer to the team
    function addEngineer() {

        // Prompt the user for engineer information
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Enter engineer's name:"
            },
            {
                type: "input",
                name: "engineerId",
                message: "Enter engineer's id:"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Enter engineer's email:"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Enter engineer's github:",
            }
        ]).then(answers => {

            // Create a new engineer object with the answers provided by the user
            const engineer = new Engineer(answers.engineerName, 
                answers.engineerId, answers.engineerEmail, 
                answers.engineerGithub);

            // Add the engineer object to the teamMembers array
            teamMembers.push(engineer);

            // Add the engineer's ID to the idList array
            idList.push(answers.engineerId);
            createTeam()
        })

    }


     // This function uses the inquirer package to prompt the 
     // user to select a role for a team member.
    function createTeam() {
    inquirer.prompt([
    {
    type: "list",
    name: "memberChoice",
    message: "Enter choice role of team member:",
    choices: [
    "Engineer",
    "Intern",
    "Nil"
    ]
    }
    ]).then((userChoice) => {
    
     // If the user chooses Engineer, call the addEngineer() function.
    if(userChoice.memberChoice === "Engineer") {

    // Add Function for Engineer
    addEngineer();

    // If the user chooses Intern, call the addIntern() function.
    } else if(userChoice.memberChoice === "Intern") {

    // Add Function for Intern
    addIntern();

    // If the user chooses Nil, call the buildTeam() function.
    } else {

    // Create Function for Team
    buildTeam();
    }
    });
    }
    
    // This function prompts for the team manager information 
    // , creates a new Manager object using the 
    //  information entry & then pushes the object into the teamMembers array.
    function createManager(){
    console.log("Build your team");
    inquirer.prompt([

    // Promptsfor the manager's name.
    {
    type: "input",
    name: "managerName",
    message: "Enter team manager's name:",

    // Validate that the user enters at least one character.
    validate: answer => {
    if(answer !== ""){
    return true
    }
    return "Enter at least one character."
    }
    },

    // Prompt the user to enter the manager's ID.
    {
    type: "input",
    name: "managerId",
    message: "Enter team manager's id:",

    // Validate that the user enters at least one character.
    validate: answer => {
    if(answer !== ""){
    return true
    }
    return "Enter at least one character."
    }
    },

    // Prompt the user to enter the manager's email.
    {
    type: "input",
    name: "managerEmail",
    message: "Enter team manager's email:",
    
    // Validate that the user enters at least one character.
    validate: answer => {
    if(answer !== ""){
    return true
    }
    return "Enter at least one character."
    }
    },
    
    // Prompt the user to enter the manager's office number.
    {
    type: "input",
    name: "managerOfficeNumber",
    message: "Enter team manager's office number:",
    
    // Validate that the user enters at least one character.
    validate: answer => {
    if(answer !== ""){
    return true
    }
    return "Enter at least one character."
    }
    },
]).then(answers => {
    
    // Create a new Manager object using the entered information.
    const manager = new Manager(answers.managerName, answers.managerId, 
    answers.managerEmail, answers.managerOfficeNumber);
    console.log(manager);
    
    // Push the new Manager object into the teamMembers array.
    teamMembers.push(manager);
    
    // Push the manager's ID into the idList array.
    idList.push(answers.managerId);
    
    // Call the createTeam() function.
    createTeam();
})
}

// Call the createManager() function for application initiation.
createManager();

}

// Call the appMenu() function.

appMenu();