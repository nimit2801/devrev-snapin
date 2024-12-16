#!/usr/bin/env node

const { installJq, checkJq } = require("./install-deps/installJq");
const {
  installDevRevCLI,
  checkDevRevCLI,
} = require("./install-deps/installDevRev");

function main() {
  // Check if DevRev CLI exists
  const isDevRevInstalled = checkDevRevCLI();

  if (!isDevRevInstalled) {
    console.info("DevRev CLI not found installing for your system!");
    installDevRevCLI();
  }
  console.log("DevRev CLI is installed.");

  const isJqInstalled = checkJq();
  if (!isJqInstalled) {
    installJq();
  }
}

main();
