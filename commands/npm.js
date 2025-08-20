// NPM CLI Commands Module for Helpsheet
// This module provides comprehensive NPM command reference

const topics = {
  "Package Management": [
    { cmd: "npm install", desc: "Installs all dependencies from package.json" },
    { cmd: "npm install <package>", desc: "Installs a specific package" },
    { cmd: "npm install <package> --save", desc: "Installs and saves to dependencies" },
    { cmd: "npm install <package> --save-dev", desc: "Installs and saves to devDependencies" },
    { cmd: "npm install <package> -g", desc: "Installs package globally" },
    { cmd: "npm uninstall <package>", desc: "Removes a package" },
    { cmd: "npm update", desc: "Updates all packages to latest versions" },
    { cmd: "npm update <package>", desc: "Updates a specific package" }
  ],
  
  "Scripts & Execution": [
    { cmd: "npm run <script>", desc: "Runs a script defined in package.json" },
    { cmd: "npm start", desc: "Runs the start script (default: node server.js)" },
    { cmd: "npm test", desc: "Runs the test script" },
    { cmd: "npm run build", desc: "Runs the build script" },
    { cmd: "npm run dev", desc: "Runs the development script" },
    { cmd: "npm run lint", desc: "Runs the linting script" },
    { cmd: "npm run clean", desc: "Runs the cleanup script" }
  ],
  
  "Package Publishing": [
    { cmd: "npm login", desc: "Logs in to npm registry" },
    { cmd: "npm publish", desc: "Publishes package to npm registry" },
    { cmd: "npm version patch", desc: "Bumps patch version (1.0.0 -> 1.0.1)" },
    { cmd: "npm version minor", desc: "Bumps minor version (1.0.0 -> 1.1.0)" },
    { cmd: "npm version major", desc: "Bumps major version (1.0.0 -> 2.0.0)" },
    { cmd: "npm unpublish <package>", desc: "Removes package from registry" },
    { cmd: "npm deprecate <package> <message>", desc: "Deprecates a package" }
  ],
  
  "Configuration & Info": [
    { cmd: "npm config list", desc: "Lists all npm configuration" },
    { cmd: "npm config get <key>", desc: "Gets a specific config value" },
    { cmd: "npm config set <key> <value>", desc: "Sets a config value" },
    { cmd: "npm info <package>", desc: "Shows detailed package information" },
    { cmd: "npm list", desc: "Lists installed packages" },
    { cmd: "npm list --depth=0", desc: "Lists only top-level packages" },
    { cmd: "npm outdated", desc: "Shows outdated packages" },
    { cmd: "npm audit", desc: "Runs security audit" }
  ]
};

// Module metadata and exports
const npmModule = {
  name: "NPM",
  description: "Node.js package manager commands and workflows",
  icon: "📦",
  topics: topics,
  // Function to get available categories
  getCategories: () => Object.keys(topics),
  // Function to get commands for a specific category
  getCommands: (category) => topics[category] || [],
  // Function to search commands
  searchCommands: (query) => {
    const results = [];
    Object.entries(topics).forEach(([category, commands]) => {
      commands.forEach(command => {
        if (command.cmd.toLowerCase().includes(query.toLowerCase()) || 
            command.desc.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...command, category });
        }
      });
    });
    return results;
  }
};

module.exports = npmModule;
