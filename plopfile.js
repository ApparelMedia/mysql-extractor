module.exports = ( plop ) => {

    plop.setGenerator('issueDetector', {
        description: "Creator an Issue Detector",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the IssueDetector Name?"
            },
            {
                type: "list",
                name: "type",
                message: "What is the Type of the Issue?",
                default: "error",
                choices: [
                    { name: "Error", value: "error" },
                    { name: "Warning", value: "warning" }
                ]
            }

        ],
        actions: [
            {
                type: "add",
                path: "issueDetectors/{{properCase name}}{{properCase type}}Detector.js",
                templateFile: "plop-templates/issueDetector.hbs"
            },
            {
                type: "modify",
                path: "processors/IssueProcessor.js",
                pattern: /(\/\/ add dependency here)/g,
                template: "var {{properCase name}}{{properCase type}} = require('../issueDetectors/{{properCase name}}{{properCase type}}Detector');\n$1"
            },
            {
                type: "modify",
                path: "processors/IssueProcessor.js",
                pattern: /(\/\/ add factory here)/g,
                template: "    {{properCase name}}{{properCase type}},\n$1"
            }
        ]
    })

};