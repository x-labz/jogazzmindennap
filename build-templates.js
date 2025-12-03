const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read all .hbs files from views directory
const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir)
  .filter(file => file.endsWith('.hbs'))
  .map(file => path.join('views', file))
  .join(' ');

// Run handlebars command
const command = `npx handlebars ${files} -f js/templates.js`;
console.log('Compiling templates...');
console.log(command);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Templates compiled successfully!');
} catch (error) {
  console.error('Error compiling templates:', error.message);
  process.exit(1);
}
