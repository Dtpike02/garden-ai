import Link from 'next/link';
import Head from 'next/head';

const blogPosts = [
  { slug: 'indoor-plant-care', title: 'Indoor Plant Care: The Complete Guide' },
  { slug: 'vegetable-gardening', title: 'Seasonal Vegetable Gardening Calendar' },
  { slug: 'natural-pest-remedies', title: 'Organic Pest Control Remedies for Your Garden' },
];

export default function BlogIndexPage() {
  return (
    <>
      <Head>
        <title>Garden AI Blog</title>
        <meta
          name="description"
          content="Explore our gardening guides: plant care, vegetable calendars, pest control tips, and more."
        />
      </Head>
      <header className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Garden AI Blog</h1>
        <ul className="list-disc pl-6 space-y-2">
          {blogPosts.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
