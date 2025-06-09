const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const mainFilePath = path.join(__dirname, '../src/cardboard.ts');
const mainFileContent = fs.readFileSync(mainFilePath, 'utf8');

const pkgVersion = packageJson.version;
const mainFileVersionMatch = mainFileContent.match(/version:\s?'(.*)'/);

console.log(`Package version: ${pkgVersion}`);
console.log(`Main file version: ${mainFileVersionMatch ? mainFileVersionMatch[1] : 'not found'}`);

if (mainFileVersionMatch && (mainFileVersionMatch[1] !== pkgVersion)) {
    console.error('Version mismatch between package.json and main file.');
    process.exit(1);
} else {
    console.log('Versions match.');
}