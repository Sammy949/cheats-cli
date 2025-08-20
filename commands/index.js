// Command Modules Loader for Helpsheet
// This file automatically discovers and loads all command modules

const fs = require('fs');
const path = require('path');

// Cache for loaded modules to prevent reloading
let cachedModules = null;

// Function to dynamically load all command modules (with caching)
function loadCommandModules() {
  // Return cached modules if already loaded
  if (cachedModules !== null) {
    return cachedModules;
  }
  
  const modules = {};
  const commandsDir = __dirname;
  
  try {
    // Read all files in the commands directory
    const files = fs.readdirSync(commandsDir);
    
    // Load each .js file (excluding index.js and any non-module files)
    files.forEach(file => {
      if (file.endsWith('.js') && file !== 'index.js') {
        try {
          const modulePath = path.join(commandsDir, file);
          const commandModule = require(modulePath);
          
          // Validate that it's a proper command module
          if (commandModule && commandModule.name && commandModule.topics) {
            const moduleName = file.replace('.js', '').toLowerCase();
            modules[moduleName] = commandModule;
            // Silent loading - no console output
          }
        } catch (error) {
          console.warn(`⚠️  Failed to load module ${file}:`, error.message);
        }
      }
    });
    
    // Cache the modules
    cachedModules = modules;
    return modules;
  } catch (error) {
    console.error('❌ Error loading command modules:', error.message);
    return {};
  }
}

// Function to get all available dev tools
function getAvailableDevTools() {
  const modules = loadCommandModules();
  return Object.entries(modules).map(([key, module]) => ({
    key: key,
    name: module.name,
    description: module.description,
    icon: module.icon,
    categoryCount: module.getCategories().length
  }));
}

// Function to get a specific dev tool module
function getDevToolModule(toolKey) {
  const modules = loadCommandModules();
  return modules[toolKey] || null;
}

// Function to search across all modules
function searchAllCommands(query) {
  const modules = loadCommandModules();
  const results = [];
  
  Object.entries(modules).forEach(([key, module]) => {
    const searchResults = module.searchCommands(query);
    searchResults.forEach(result => {
      result.devTool = module.name;
      result.devToolIcon = module.icon;
    });
    results.push(...searchResults);
  });
  
  return results;
}

module.exports = {
  loadCommandModules,
  getAvailableDevTools,
  getDevToolModule,
  searchAllCommands
};
