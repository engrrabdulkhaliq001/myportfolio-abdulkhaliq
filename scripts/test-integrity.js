const fs = require('fs');
const path = require('path');

console.log('🧪 Running comprehensive test suite for Portfolio UI/UX and integrations...');

const projectRoot = path.resolve(__dirname, '..');
let testFailures = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    testFailures++;
  }
}

// 1. Check style.css palette tokens
const styleCss = fs.readFileSync(path.join(projectRoot, 'style.css'), 'utf-8');
console.log('\n[Suite 1: Palette Tokens in style.css]');
assert(styleCss.includes('#080E18'), 'Midnight Navy (#080E18) is defined');
assert(styleCss.includes('#111B2B'), 'Slate Blue (#111B2B) is defined');
assert(styleCss.includes('#22D3EE'), 'Electric Cyan (#22D3EE) is defined');
assert(styleCss.includes('#F1F5F9'), 'Soft White (#F1F5F9) is defined');
assert(styleCss.includes('#94A3B8'), 'Muted Slate (#94A3B8) is defined');
assert(styleCss.includes('#8B7CFF'), 'Soft Violet (#8B7CFF) is defined');
assert(styleCss.includes('rgba(148, 163, 184, 0.15)'), 'Subtle border (rgba(148, 163, 184, 0.15)) is defined');
assert(styleCss.includes('rgba(34, 211, 238, 0.45)'), 'Cyan hover border (rgba(34, 211, 238, 0.45)) is defined');

// 2. Check index.html section anchors and content
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
console.log('\n[Suite 2: Content & Navigation Anchors in index.html]');
assert(indexHtml.includes('id="home"'), 'Home section anchor exists');
assert(indexHtml.includes('id="metrics"'), 'Metrics section anchor exists');
assert(indexHtml.includes('id="projects"'), 'Projects section anchor exists');
assert(indexHtml.includes('id="skills"'), 'Skills section anchor exists');
assert(indexHtml.includes('id="architecture"'), 'Architecture section anchor exists');
assert(indexHtml.includes('id="contact"'), 'Contact section anchor exists');
assert(indexHtml.includes('Abdul Khaliq'), 'Name "Abdul Khaliq" is present in heading');
assert(indexHtml.includes('AI &amp; Backend Systems Engineer') || indexHtml.includes('AI & Backend Systems Engineer'), 'Role "AI & Backend Systems Engineer" is present');
assert(indexHtml.includes('kaleri.png'), 'Authentic profile photo kaleri.png is referenced');

// 3. Check 5 Projects presence
console.log('\n[Suite 3: Featured Projects Presence]');
assert(indexHtml.includes('Iconspire'), 'Iconspire project card exists');
assert(indexHtml.includes('ClearWay'), 'ClearWay project card exists');
assert(indexHtml.includes('Sigma RAG'), 'Sigma RAG project card exists');
assert(indexHtml.includes('AI Resume Screening'), 'AI Resume Screening project card exists');
assert(indexHtml.includes('Student Performance Predictor'), 'Student Performance Predictor project card exists');
assert(indexHtml.includes('https://student-perfomance-predictor.streamlit.app/'), 'Live Streamlit link for Student Predictor exists');

// 4. Check External Links & Contact
console.log('\n[Suite 4: Links and Contact Channels]');
assert(indexHtml.includes('https://github.com/engrrabdulkhaliq001'), 'GitHub profile link exists');
assert(indexHtml.includes('https://www.linkedin.com/in/abdul-khaliq-5a48a53ab'), 'LinkedIn profile link exists');
assert(indexHtml.includes('engrrabdulkhaliq@gmail.com'), 'Email address exists');
assert(indexHtml.includes('id="contactForm"'), 'Contact form element exists');

// 5. Check script.js functionality
const scriptJs = fs.readFileSync(path.join(projectRoot, 'script.js'), 'utf-8');
console.log('\n[Suite 5: Script Logic and Supabase Integration]');
assert(scriptJs.includes('SUPABASE_CONFIG'), 'Supabase configuration object exists');
assert(scriptJs.includes('contact_messages'), 'Supabase contact_messages table target exists');
assert(scriptJs.includes('initProjectModals'), 'Modal initialization logic exists');
assert(scriptJs.includes('initMetricsAnimation'), 'Metrics animation logic exists');
assert(scriptJs.includes('prefers-reduced-motion'), 'prefers-reduced-motion accessibility is implemented');

if (testFailures > 0) {
  console.error(`\n❌ Tests failed: ${testFailures} assertion(s) failed.`);
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed successfully! 100% integrity verified.');
  process.exit(0);
}
