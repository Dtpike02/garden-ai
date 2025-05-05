/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://gardenai.me',
    generateRobotsTxt: true,    // (optional) generate a robots.txt
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000
  }
  