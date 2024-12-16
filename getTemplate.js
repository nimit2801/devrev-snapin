#!/usr/bin/env node

const { execSync } = require("child_process");
const { checkDevRevCLI } = require("./install-deps/installDevRev");
const axios = require("axios");
const fs = require("fs");
const unzipper = require("unzipper");
const checkRename = require("./utils");

const rename = process.argv[5];
const templateName = process.argv[3];
const templateNames = [
  "default",
  "external-action",
  "internal-action",
  "external-trigger",
];

const mapTemplates = {
  default: {
    url: "https://github.com/nimit2801/devrev-snapin-templates/releases/download/template-release/starters.zip",
    name: "1-starter",
  },
  internal_action: {
    url: "https://github.com/nimit2801/devrev-snapin-templates/releases/download/template-release/internal-action.zip",
    name: "6-timer-ticket-creator",
  },
  external_actions: {
    url: "https://github.com/nimit2801/devrev-snapin-templates/releases/download/template-release/external-actions.zip",
    name: "9-external-action",
  },
  external_webhooks: {
    url: "https://github.com/nimit2801/devrev-snapin-templates/releases/download/template-release/external-webhook.zip",
    name: "8-external-github-webhook",
  },
};

async function getDevRevSnapInTemplate() {
  const devrevCLICheck = checkDevRevCLI();
  if (!devrevCLICheck) {
    console.error("please run npx devrev-snapin:setup");
    return;
  }

  if (process.argv[2] === "--template") {
    if (!templateName) console.error("No template selected");

    switch (templateName) {
      case "default":
        {
          await downloadAndExtractZip(
            mapTemplates.default.url,
            `${process.cwd()}`
          );
          if (checkRename) {
            renameDefault(mapTemplates.default.name, rename);
          }
        }
        break;
      case "internal-action":
        {
          await downloadAndExtractZip(
            mapTemplates.internal_action.url,
            `${process.cwd()}`
          );
          if (checkRename) {
            renameDefault(mapTemplates.internal_action.name, rename);
          }
        }
        break;
      case "external-action":
        {
          await downloadAndExtractZip(
            mapTemplates.external_actions.url,
            `${process.cwd()}`
          );
          if (checkRename) {
            renameDefault(mapTemplates.external_actions.name, rename);
          }
        }
        break;
      case "external-trigger":
        {
          await downloadAndExtractZip(
            mapTemplates.external_webhooks.url,
            `${process.cwd()}`
          );
          if (checkRename) {
            renameDefault(mapTemplates.external_webhooks.name, rename);
          }
        }
        break;
      default:
        console.log("Invalid template name");
    }

    console.log("exists");
  }
}

function renameDefault(defaultName, rename) {
  // Validate input parameters
  if (!defaultName || !rename) {
    console.error("Both defaultName and rename parameters are required.");
    return;
  }

  // Check if the source directory exists
  if (!fs.existsSync(defaultName)) {
    console.error(`Source directory "${defaultName}" does not exist.`);
    return;
  }

  try {
    execSync(`mv "${defaultName}" "${rename}"`); // Use quotes to prevent command injection
    console.log(`Successfully renamed template to: ${rename}`);
  } catch (error) {
    console.error(`Error renaming template: ${error.message}`);
  }
}

// Function to download a .zip file from the internet and extract it
async function downloadAndExtractZip(url, outputPath) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      responseType: "stream",
    })
      .then((response) => {
        response.data
          .pipe(unzipper.Extract({ path: outputPath }))
          .on("close", () => {
            console.log("Download and extraction complete.");
            resolve(); // Resolve the promise on success
          })
          .on("error", (err) => {
            console.error(`Error during extraction: ${err.message}`);
            reject(err); // Reject the promise on error
          });
      })
      .catch((err) => {
        console.error(`Error during download: ${err.message}`);
        reject(err); // Reject the promise if the axios request fails
      });
  });
}

getDevRevSnapInTemplate();
