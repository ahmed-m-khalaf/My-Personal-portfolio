// This acts as the Business Logic Layer for the Blog.
// UI components should ONLY import functions from this file, never read MDX/JSON directly.
// In the future, if we switch to a CMS, we only need to update this file.

import contentIndex from './content-index.json';

/**
 * Get all blog posts, sorted by date (newest first).
 */
export function getAllPosts(lang = 'en') {
  // In a real app, you might want to return different data based on lang, 
  // but since our MDX has both en and ar fields, we can just return the array
  // and let the UI pick `post.title` vs `post.titleAr`.
  
  return contentIndex.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a specific post by its slug.
 */
export function getPostBySlug(slug, lang = 'en') {
  return contentIndex.find((post) => post.slug === slug) || null;
}

/**
 * Get only featured posts.
 */
export function getFeaturedPosts(lang = 'en') {
  return getAllPosts(lang).filter(post => post.featured);
}

/**
 * Get posts by a specific category.
 */
export function getPostsByCategory(category, lang = 'en') {
  return getAllPosts(lang).filter(post => post.category === category);
}

/**
 * Get posts containing a specific tag.
 */
export function getPostsByTag(tag, lang = 'en') {
  return getAllPosts(lang).filter(post => post.tags.includes(tag));
}

/**
 * Extract all unique categories from all posts.
 */
export function getAllCategories(lang = 'en') {
  const categories = new Set();
  getAllPosts(lang).forEach(post => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories);
}

/**
 * Extract all unique tags from all posts.
 */
export function getAllTags(lang = 'en') {
  const tags = new Set();
  getAllPosts(lang).forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags);
}
