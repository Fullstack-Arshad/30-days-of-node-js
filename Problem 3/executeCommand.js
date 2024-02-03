const { exec } = require('child_process')
const { stderr } = require('process')

function executeCommand(command) {
    exec(command,(err,stdout,stderr) => {
        if (err) {
            console.log(`Error Occured: ${err.message}`)
        }
        else {
            console.log(`Expected Output: ${stdout}`)
        }
    })
}

executeCommand('ls -la');

executeCommand('dir')

executeCommand('echo "Hello, Node.js!"');