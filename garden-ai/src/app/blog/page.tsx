import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react'; // Using lucide-react for a simple icon

// Define the blog post data with added descriptions
const blogPosts = [
  {
    slug: 'indoor-plant-care',
    title: 'Indoor Plant Care: The Complete Guide',
    description: 'Master the essentials of keeping your houseplants happy and healthy, from light and water to soil and pests.'
  },
  {
    slug: 'vegetable-gardening',
    title: 'The Complete Guide to Starting Your Own Vegetable Garden',
    description: 'Learn everything you need to know to plan, plant, and harvest your own delicious vegetables.'
  },
  {
    slug: 'natural-pest-remedies', // Assuming this matches the slug for the pest control post
    title: 'Organic Pest Control Remedies for Your Garden',
    description: 'Discover eco-friendly ways to manage garden pests and protect your precious plants naturally.'
  },
  // Add more posts here...
];

// Define the BlogIndexPage component
export default function BlogIndexPage() {
  return (
    <>
      {/* Head component for SEO and page title */}
      <Head>
        <title>Garden AI Blog - Guides & Tips</title>
        <meta
          name="description"
          content="Explore our gardening guides: plant care, vegetable calendars, organic pest control tips, and more from Garden AI."
        />
        <script type="application/ld+json">
          {`{
            "@context":"https://schema.org",
            "@type":"ItemList",
            "itemListElement": [
              ${blogPosts.map((p, i) => `{"@type":"ListItem","position":${i+1},"url":"https://gardenai.me/blog/${p.slug}"}`).join(',')}
            ]
          }`}
        </script>
      </Head>

      {/* Main container with background and padding */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 py-8 md:py-12 font-['Inter',_sans-serif]">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header navigation */}
          <header className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-900 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </header>

          {/* Main content area */}
          <main>
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
              Garden AI Blog
            </h1>

            {/* Grid layout for blog post cards */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8">
              {blogPosts.map(({ slug, title, description }) => (
                // Blog post card
                <Link
                  href={`/blog/${slug}`}
                  key={slug}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Post Title */}
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                      {title}
                    </h2>
                    {/* Post Description */}
                    <p className="text-gray-600 text-base leading-relaxed">
                      {description}
                    </p>
                    {/* Read More indication (optional) */}
                    <span className="inline-block mt-4 text-emerald-600 group-hover:underline font-medium">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </main>

          {/* Footer (optional) */}
          <footer className="text-center mt-12 text-gray-500 text-sm">
            © {new Date().getFullYear()} Garden AI. All rights reserved.
          </footer>

        </div>
      </div>
    </>
  );
}
