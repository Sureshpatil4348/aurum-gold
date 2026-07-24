import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, callback);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      callback(fullPath);
    }
  }
}

const dirToWalk = path.join(process.cwd(), 'src');

walk(dirToWalk, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const routerImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"](?:\.\.\/)+router\/router(?:\.jsx)?['"];?/g;
  
  content = content.replace(routerImportRegex, (match, imports) => {
    changed = true;
    let nextImports = [];
    if (imports.includes('Link')) nextImports.push(`import Link from 'next/link';`);
    if (imports.includes('useRouter')) nextImports.push(`import { usePathname, useRouter } from 'next/navigation';`);
    return nextImports.join('\n');
  });

  if (content.includes('const { path } = useRouter()')) {
    content = content.replace(/const \{ path \} = useRouter\(\)/g, 'const path = usePathname(); const router = useRouter();');
    changed = true;
  }

  if (content.includes('navigate(')) {
    content = content.replace(/navigate\(/g, 'router.push(');
    changed = true;
  }
  
  if (content.includes('<Link')) {
    content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
    changed = true;
  }

  // Also replace `usePageMeta` if it's imported, because Next.js uses Metadata API. We'll just comment it out.
  const seoImportRegex = /import\s+usePageMeta\s+from\s+['"](?:\.\.\/)+seo\/usePageMeta(?:\.jsx|)?['"];?/g;
  content = content.replace(seoImportRegex, (match) => {
    changed = true;
    return `// ${match}`;
  });

  if (content.includes('usePageMeta(')) {
    content = content.replace(/usePageMeta\(/g, '// usePageMeta(');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
});
