// A function to install JQ Deps

const { execSync } = require("child_process");

function checkJq() {
  try {
    // Try to execute 'jq --version'
    execSync("jq --version", { stdio: "ignore" });
    return true;
  } catch (error) {
    console.log("jq is not installed on your system.");
    return false;
  }
}

function installJq() {
  try {
    // Check if jq is already installed
    try {
      execSync("which jq", { stdio: "ignore" });
      console.log("✅ jq is already installed");
      return true;
    } catch (error) {
      // jq is not installed, proceed with installation
      console.log("📦 Installing jq...");

      // Check if brew is installed
      try {
        execSync("which brew", { stdio: "ignore" });
      } catch (error) {
        console.error(
          "❌ Homebrew is not installed. Please install Homebrew first."
        );
        return false;
      }

      // Install jq using brew
      execSync("brew install jq", { stdio: "inherit" });
      console.log("✅ jq has been successfully installed");
      checkJq();

      return true;
    }
  } catch (error) {
    console.error("❌ Failed to install jq:", error.message);
    return false;
  }
}

module.exports = {
  installJq,
  checkJq,
};
