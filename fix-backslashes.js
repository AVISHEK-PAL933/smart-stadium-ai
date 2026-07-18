const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walkDir(path.join(process.cwd(), 'app'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('..\\')) {
     content = content.replace(/\.\.\\/g, '../');
     changed = true;
  }
  if (content.includes('context\\GlobalProvider')) {
     content = content.replace(/context\\GlobalProvider/g, 'context/GlobalProvider');
     changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Fixed backslashes with updated JS script');
