const fs = require('fs');
const path = require('path');

console.log('🚀 Running production build verification check for Portfolio...');

const projectRoot = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'style.css',
  'script.js',
  'kaleri.png',
  'README.md'
];

let hasErrors = false;

requiredFiles.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing critical file: ${file}`);
    hasErrors = true;
  } else {
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      console.error(`❌ Critical file is empty (0 bytes): ${file}`);
      hasErrors = true;
    } else {
      console.log(`✅ Asset verified: ${file} (${stats.size} bytes)`);
    }
  }
});

// Verify index.html contains proper stylesheet and script links
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');

if (!indexHtml.includes('style.css')) {
  console.error('❌ index.html does not link to style.css');
  hasErrors = true;
}

if (!indexHtml.includes('script.js')) {
  console.error('❌ index.html does not include script.js');
  hasErrors = true;
}

if (!indexHtml.includes('kaleri.png')) {
  console.error('❌ index.html does not reference authentic portrait kaleri.png');
  hasErrors = true;
}

if (hasErrors) {
  console.error('💥 Production build check failed with errors.');
  process.exit(1);
} else {
  console.log('🎉 Production build verification succeeded: Static bundle ready for deployment.');
  process.exit(0);
}
