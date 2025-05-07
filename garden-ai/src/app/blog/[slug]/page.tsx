
// src/app/blog/[slug]/page.tsx (Dynamic Blog Post Page with awaited params)

import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Dynamic imports of your post components
const posts: Record<
  string,
  () => Promise<{
    default: () => ReactElement;
    metadata: { title: string; description: string };
  }>
> = {
  'indoor-plant-care': () => import('@/posts/indoor-plant-care'),
  'vegetable-gardening': () => import('@/posts/vegetable-gardening'),
  'natural-pest-remedies': () => import('@/posts/natural-pest-remedies'),
};

interface Params {
  slug: string;
}

// Pre-generate all possible slugs for static generation
export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

const howToSteps = [
  { name: 'Inspect your plants', text: 'Check leaves for pests or discoloration.' },
  { name: 'Mix neem oil solution', text: 'Combine 2 tsp neem oil with 1 qt water.' },
  /* ... */
];

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loader = posts[slug];
  if (!loader) notFound();

  const { default: PostComponent, metadata } = await loader();

  return (
    <>
      <Head>
        <title className='className="font-semibold'>{metadata.title} | Garden AI Blog</title>
        <meta name="description" content={metadata.description} />
        <script type="application/ld+json">
          {`{
            "@context":"https://schema.org",
            "@type":"Article",
            "headline":"${metadata.title}",
            "author":{"@type":"Organization","name":"Garden AI"},
            "publisher":{"@type":"Organization","name":"Garden AI","logo":{"@type":"ImageObject","url":"https://gardenai.me/logo.png"}},
            "datePublished":"2025-05-07",
            "dateModified":"2025-05-07"
          }`}
        </script>
        <script type="application/ld+json">
          {`{
            "@context":"https://schema.org",
            "@type":"HowTo",
            "name":"How to Treat Aphids in 5 Steps",
            "step":[
              ${howToSteps.map((s, i) => `{"@type":"HowToStep","position":${i+1},"name":"${s.name}","text":"${s.text}"}`).join(',')}
            ]
          }`}
        </script>
      </Head>
      <header className="mb-6">
          <Link href="/blog" className="text-green-600 font-semibold hover:underline">← Back to Blog</Link>
      </header>
      <main className=" container mx-auto px-4 py-8">
        <PostComponent />
      </main>
    </>
  );
}

