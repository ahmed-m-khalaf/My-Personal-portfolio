import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content/blog');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/content-index.json');

function generateIndex() {
  console.log('Generating content index from real MDX files...');
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('Content directory does not exist yet.');
    return;
  }

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const posts = [];
  
  const slugs = fs.readdirSync(CONTENT_DIR).filter(folder => {
    return fs.statSync(path.join(CONTENT_DIR, folder)).isDirectory();
  });

  for (const slug of slugs) {
    const folderPath = path.join(CONTENT_DIR, slug);
    let mdxPath = path.join(folderPath, 'index.ar.mdx');
    if (!fs.existsSync(mdxPath)) {
      mdxPath = path.join(folderPath, 'index.en.mdx');
    }
    
    if (fs.existsSync(mdxPath)) {
      const fileContent = fs.readFileSync(mdxPath, 'utf-8');
      const { data } = matter(fileContent); // Extract frontmatter
      
      posts.push({
        slug,
        ...data, // This puts all frontmatter variables (title, excerpt, cover, etc) into the JSON
      });
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Content index generated at ${OUTPUT_FILE} with ${posts.length} posts.`);
}

generateIndex();
