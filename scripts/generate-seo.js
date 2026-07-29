import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content/blog');
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITE_URL = 'https://amk.tech';

function getSortedPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs = fs.readdirSync(CONTENT_DIR).filter(folder =>
    fs.statSync(path.join(CONTENT_DIR, folder)).isDirectory()
  );

  const posts = [];

  for (const slug of slugs) {
    const folderPath = path.join(CONTENT_DIR, slug);
    let mdxPath = path.join(folderPath, 'index.ar.mdx');
    if (!fs.existsSync(mdxPath)) {
      mdxPath = path.join(folderPath, 'index.en.mdx');
    }

    if (fs.existsSync(mdxPath)) {
      const fileContent = fs.readFileSync(mdxPath, 'utf-8');
      const { data } = matter(fileContent);
      if (!data.draft) {
        posts.push({ slug, ...data });
      }
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

// ── Sitemap Generator ───────────────────────────────────
function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const post of posts) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.updatedAt || post.date}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += '</urlset>';

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log('✓ sitemap.xml generated');
}

// ── RSS Feed Generator ──────────────────────────────────
function generateRSS(posts) {
  let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
  rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  rss += '  <channel>\n';
  rss += '    <title>AMK Blog - Ahmed M. Khalaf</title>\n';
  rss += `    <link>${SITE_URL}/blog</link>\n`;
  rss += '    <description>Insights and articles on frontend development, AI, and web technology.</description>\n';
  rss += '    <language>ar</language>\n';
  rss += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rss += `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>\n`;

  for (const post of posts) {
    const title = post.titleAr || post.title;
    const excerpt = post.excerptAr || post.excerpt || '';
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    rss += '    <item>\n';
    rss += `      <title><![CDATA[${title}]]></title>\n`;
    rss += `      <link>${link}</link>\n`;
    rss += `      <guid isPermaLink="true">${link}</guid>\n`;
    rss += `      <description><![CDATA[${excerpt}]]></description>\n`;
    rss += `      <pubDate>${pubDate}</pubDate>\n`;
    if (post.category) {
      rss += `      <category>${post.category}</category>\n`;
    }
    rss += '    </item>\n';
  }

  rss += '  </channel>\n';
  rss += '</rss>';

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss);
  console.log('✓ rss.xml generated');
}

// ── robots.txt Generator ────────────────────────────────
function generateRobotsTxt() {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), content);
  console.log('✓ robots.txt generated');
}

// ── Main ────────────────────────────────────────────────
console.log('Generating SEO files...');
const posts = getSortedPosts();
generateSitemap(posts);
generateRSS(posts);
generateRobotsTxt();
console.log(`Done! Generated SEO files for ${posts.length} posts.`);
