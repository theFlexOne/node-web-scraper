#! /usr/bin/env node

import promptSync from "prompt-sync";

const EXIT_COMMANDS = ["exit"];

export function start(page) {
  const prompt = promptSync();

  const mainMenu = (() => {
    const msg = "What would you like to do?";
    const options = Object.keys(page).map((key, i) => {
      return `  ${i + 1}. ${key}`;
    });
    return [msg, ...options, ""].join("\n");
  })();

  let message = mainMenu;
  let input;
  let result;

  while (true) {
    input = prompt(message);
    if (isExitCommand(input)) break;
  }
}

function isExitCommand(command) {
  return EXIT_COMMANDS.some((exitCommand) => {
    return exitCommand.toLowerCase() === command.toLowerCase();
  });
}
