const fs = require('fs');
const path = require('path');

const pages = ['about', 'pricing', 'contact', 'faq', 'setup-guide', 'results'];
const pagesMap = {
  'about': 'AboutPage',
  'pricing': 'PricingPage',
  'contact': 'ContactPage',
  'faq': 'FAQPage',
  'setup-guide': 'SetupGuidePage',
  'results': 'ResultsPage'
};

const appDir = path.join(process.cwd(), 'src', 'app');

pages.forEach(page => {
  const pageDir = path.join(appDir, page);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  const compName = pagesMap[page];
  const content = `import ${compName} from "../../pages_old/${compName}";

export default function Page() {
  return <${compName} />;
}
`;
  fs.writeFileSync(path.join(pageDir, 'page.js'), content, 'utf8');
  console.log(`Created app/${page}/page.js`);
});
