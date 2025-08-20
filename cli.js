#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen").default;
const figlet = require("figlet");
const clipboardy = require("clipboardy");

// Import the command modules loader
const { getAvailableDevTools, getDevToolModule, searchAllCommands } = require('./commands');

// Function to clear terminal screen
function clearTerminal() {
  // Clear terminal for cross-platform compatibility
  process.stdout.write('\x1Bc');
  // Alternative method for some terminals
  console.clear();
}

// Display the beautiful ASCII art header
function displayHeader() {
  const header = figlet.textSync("Helpsheet", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default"
  });
  
  console.log(chalk.cyan(header));
  console.log(chalk.yellow("🚀 Your comprehensive offline terminal help system"));
  console.log(chalk.gray("Navigate through developer tools and find the commands you need\n"));
}

// Display available tools summary with collapsible interface
function displayToolsSummary(devTools) {
  console.log(chalk.blue(`📚 ${devTools.length} Development Knowledge Bases Available:`));
  console.log(chalk.gray("   (Use arrow keys and Enter to navigate)\n"));
}

// Display expanded tools list
function displayExpandedTools(devTools) {
  console.log(chalk.blue(`📚 ${devTools.length} Development Knowledge Bases Available:\n`));
  
  devTools.forEach(tool => {
    console.log(chalk.white(`${tool.icon} ${tool.name} - ${tool.description}`));
    console.log(chalk.gray(`   ${tool.categoryCount} command categories\n`));
  });
}

// Main menu to select development tool
async function selectDevTool() {
  const devTools = getAvailableDevTools();
  
  if (devTools.length === 0) {
    console.log(chalk.red("❌ No command modules found. Please check the commands directory."));
    process.exit(1);
  }
  
  // Clear terminal and show fresh interface
  clearTerminal();
  displayHeader();
  displayToolsSummary(devTools);
  
  // Ask if user wants to see details
  const { showDetails } = await inquirer.prompt([
    {
      type: "list",
      name: "showDetails",
      message: "What would you like to do?",
      choices: [
        {
          name: "🔽 Expand knowledge bases details",
          value: "expand"
        },
        {
          name: "🚀 Start exploring tools",
          value: "start"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  if (showDetails === "exit") {
    console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
    process.exit(0);
  }
  
  if (showDetails === "expand") {
    // Clear and show expanded view
    clearTerminal();
    displayHeader();
    displayExpandedTools(devTools);
    
    // Wait for user to continue
    await inquirer.prompt([
      {
        type: "input",
        name: "continue",
        message: "Press Enter to continue to tool selection...",
        default: ""
      }
    ]);
    
    // Clear and show main interface
    clearTerminal();
    displayHeader();
    displayToolsSummary(devTools);
  }
  
  // Now show the main tool selection
  const { selectedTool } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedTool",
      message: "🔧 Which development tool would you like to explore?",
      choices: [
        ...devTools.map(tool => ({
          name: `${tool.icon} ${tool.name} - ${tool.description} (${tool.categoryCount} categories)`,
          value: tool.key
        })),
        new inquirer.Separator(),
        {
          name: "🔍 Search across all tools",
          value: "search"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  if (selectedTool === "exit") {
    console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
    process.exit(0);
  }
  
  if (selectedTool === "search") {
    await handleGlobalSearch();
    return;
  }
  
  await selectCategory(selectedTool);
}

// Handle global search across all tools
async function handleGlobalSearch() {
  const { searchQuery } = await inquirer.prompt([
    {
      type: "input",
      name: "searchQuery",
      message: "🔍 What command are you looking for?",
      validate: (input) => input.trim().length > 0 ? true : "Please enter a search term"
    }
  ]);
  
  const results = searchAllCommands(searchQuery.trim());
  
  if (results.length === 0) {
    console.log(chalk.yellow("🔍 No commands found matching your search."));
    await selectDevTool();
    return;
  }
  
  // Group results by dev tool
  const groupedResults = {};
  results.forEach(result => {
    if (!groupedResults[result.devTool]) {
      groupedResults[result.devTool] = [];
    }
    groupedResults[result.devTool].push(result);
  });
  
  console.log(chalk.green(`\n🔍 Found ${results.length} commands matching "${searchQuery}":\n`));
  
  Object.entries(groupedResults).forEach(([devTool, commands]) => {
    console.log(chalk.cyan(`\n${commands[0].devToolIcon} ${devTool}:`));
    commands.forEach(command => {
      console.log(chalk.white(`  ${command.cmd}`));
      console.log(chalk.gray(`    ${command.desc}`));
    });
  });
  
  // Ask what to do next after search
  const { nextAction } = await inquirer.prompt([
    {
      type: "list",
      name: "nextAction",
      message: "\nWhat would you like to do next?",
      choices: [
        {
          name: "🔄 Search again",
          value: "search_again"
        },
        {
          name: "🏠 Back to main menu",
          value: "main_menu"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  switch (nextAction) {
    case "search_again":
      await handleGlobalSearch();
      break;
    case "main_menu":
      await selectDevTool();
      break;
    case "exit":
      console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
      process.exit(0);
  }
}

// Select category within a specific dev tool
async function selectCategory(toolKey) {
  const devTool = getDevToolModule(toolKey);
  
  if (!devTool) {
    console.log(chalk.red(`❌ Failed to load ${toolKey} module.`));
    await selectDevTool();
    return;
  }
  
  const categories = devTool.getCategories();
  
  const { selectedCategory } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedCategory",
      message: `${devTool.icon} ${devTool.name} - Select a category:`,
      choices: [
        ...categories.map(category => ({
          name: category,
          value: category
        })),
        new inquirer.Separator(),
        {
          name: "🔍 Search within this tool",
          value: "search"
        },
        {
          name: "⬅️  Back to dev tools",
          value: "back"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  if (selectedCategory === "exit") {
    console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
    process.exit(0);
  }
  
  if (selectedCategory === "back") {
    await selectDevTool();
    return;
  }
  
  if (selectedCategory === "search") {
    await handleToolSearch(toolKey);
    return;
  }
  
  await displayCommands(toolKey, selectedCategory);
}

// Handle search within a specific tool
async function handleToolSearch(toolKey) {
  const devTool = getDevToolModule(toolKey);
  
  const { searchQuery } = await inquirer.prompt([
    {
      type: "input",
      name: "searchQuery",
      message: `🔍 Search within ${devTool.name}:`,
      validate: (input) => input.trim().length > 0 ? true : "Please enter a search term"
    }
  ]);
  
  const results = devTool.searchCommands(searchQuery.trim());
  
  if (results.length === 0) {
    console.log(chalk.yellow("🔍 No commands found matching your search."));
    await selectCategory(toolKey);
    return;
  }
  
  console.log(chalk.green(`\n🔍 Found ${results.length} commands in ${devTool.name} matching "${searchQuery}":\n`));
  
  results.forEach(command => {
    console.log(chalk.white(`  ${command.cmd}`));
    console.log(chalk.gray(`    ${command.desc}`));
    console.log(chalk.cyan(`    Category: ${command.category}\n`));
  });
  
  // Ask what to do next after search
  const { nextAction } = await inquirer.prompt([
    {
      type: "list",
      name: "nextAction",
      message: "\nWhat would you like to do next?",
      choices: [
        {
          name: "🔄 Search again in this tool",
          value: "search_again"
        },
        {
          name: "📁 Browse categories",
          value: "browse_categories"
        },
        {
          name: "🏠 Back to main menu",
          value: "main_menu"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  switch (nextAction) {
    case "search_again":
      await handleToolSearch(toolKey);
      break;
    case "browse_categories":
      await selectCategory(toolKey);
      break;
    case "main_menu":
      await selectDevTool();
      break;
    case "exit":
      console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
      process.exit(0);
  }
}

// Display commands for a specific category
async function displayCommands(toolKey, category) {
  const devTool = getDevToolModule(toolKey);
  const commands = devTool.getCommands(category);
  
  console.log(chalk.cyan(`\n${devTool.icon} ${devTool.name} - ${category}`));
  console.log(chalk.gray("=".repeat(50)));
  
  const { selectedCommand } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedCommand",
      message: "📋 Select a command to copy to clipboard:",
      choices: [
        ...commands.map(command => ({
          name: `${command.cmd}`,
          value: command
        })),
        new inquirer.Separator(),
        {
          name: "⬅️  Back to categories",
          value: "back"
        },
        {
          name: "🏠 Back to dev tools",
          value: "home"
        },
        {
          name: "❌ Exit",
          value: "exit"
        }
      ]
    }
  ]);
  
  if (selectedCommand === "exit") {
    console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
    process.exit(0);
  }
  
  if (selectedCommand === "back") {
    await selectCategory(toolKey);
    return;
  }
  
  if (selectedCommand === "home") {
    await selectDevTool();
    return;
  }
  
  // Copy command to clipboard and show details
  try {
    await clipboardy.write(selectedCommand.cmd);
    
    const commandBox = boxen(
      `${chalk.green("✅ Command copied to clipboard!")}\n\n` +
      `${chalk.white("Command:")} ${chalk.yellow(selectedCommand.cmd)}\n\n` +
      `${chalk.white("Description:")} ${chalk.cyan(selectedCommand.desc)}\n\n` +
      `${chalk.gray("You can now paste this command in your terminal")}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green"
      }
    );
    
    console.log(commandBox);
    
    // Ask what to do next
    const { nextAction } = await inquirer.prompt([
      {
        type: "list",
        name: "nextAction",
        message: "What would you like to do next?",
        choices: [
          {
            name: "🔄 View another command from this category",
            value: "same_category"
          },
          {
            name: "📁 Browse another category",
            value: "other_category"
          },
          {
            name: "🔧 Switch to another dev tool",
            value: "other_tool"
          },
          {
            name: "❌ Exit",
            value: "exit"
          }
        ]
      }
    ]);
    
    switch (nextAction) {
      case "same_category":
        await displayCommands(toolKey, category);
        break;
      case "other_category":
        await selectCategory(toolKey);
        break;
      case "other_tool":
        await selectDevTool();
        break;
      case "exit":
        console.log(chalk.blue("👋 Thanks for using Helpsheet!"));
        process.exit(0);
    }
    
  } catch (error) {
    console.log(chalk.red(`❌ Failed to copy command to clipboard: ${error.message}`));
    console.log(chalk.yellow(`Command: ${selectedCommand.cmd}`));
    console.log(chalk.cyan(`Description: ${selectedCommand.desc}`));
    
    await displayCommands(toolKey, category);
  }
}

// Main application entry point
async function main() {
  try {
    displayHeader();
    await selectDevTool();
  } catch (error) {
    console.error(chalk.red("❌ An error occurred:"), error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.blue("\n👋 Thanks for using Helpsheet!"));
  process.exit(0);
});

// Start the application
if (require.main === module) {
  main();
}
