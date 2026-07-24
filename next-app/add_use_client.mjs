import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.jsx')) {
      callback(fullPath);
    }
  }
}

const dirs = [path.join(process.cwd(), 'src/components'), path.join(process.cwd(), 'src/pages_old')];

dirs.forEach(dir => {
  walk(dir, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    // if it doesn't already have 'use client', add it
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      content = '"use client";\n' + content;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added "use client" to: ${filePath}`);
    }
  });
});
