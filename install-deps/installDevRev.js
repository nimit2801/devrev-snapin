const { execSync } = require("child_process");
const fs = require("fs");

let counter = 0;
function checkDevRevCLI() {
  try {
    // Try to execute 'devrev --version'
    execSync("devrev --version", { stdio: "ignore" });
    return true;
  } catch (error) {
    counter++;
    if (counter === 3) {
      console.log(
        "Tried 3 times. Please install DevRev CLI manually from: https://docs.devrev.ai/cli"
      );
      process.exit(1);
    }
    return false;
  }
}

async function installDevRevCLI() {
  console.log("Installing DevRev CLI...");
  try {
    execSync(
      "wget https://github.com/devrev/cli/releases/latest/download/devrev.rb --no-check-certificate"
    );
    console.log("RB file installed for DevRev");
  } catch (error) {
    console.error("Failed to install DevRev CLI:", error.message);
    console.log(
      "Please install DevRev CLI manually. Visit: https://docs.devrev.ai/cli"
    );
    return false;
  }
  execSync("brew install ./devrev.rb");
  console.log("Installed devrev.rb file with brew");
  execSync(
    "wget https://raw.githubusercontent.com/devrev/cli/main/install_completions.sh --no-check-certificate && sh install_completions.sh /opt/homebrew/bin/devrev"
  );
  console.log("Installation and setup complete!");

  fs.unlinkSync("devrev.rb");
  fs.unlinkSync("install_completions.sh");

  checkDevRevCLI();
}

module.exports = {
  installDevRevCLI,
  checkDevRevCLI,
};
