function checkRename() {
  return process.argv[4] === "--rename" && process.argv[5];
}

module.exports = checkRename;
