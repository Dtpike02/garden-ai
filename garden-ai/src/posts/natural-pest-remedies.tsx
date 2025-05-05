export const metadata = {
  title: 'Organic Pest Control Remedies for Your Garden',
  description: 'Discover safe, organic methods to combat common garden pests without harmful chemicals.'
};
export default function NaturalPestRemedies() {
  return (
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      <h1 className="text-4xl font-extrabold mb-4">Organic Pest Control Remedies for Your Garden</h1>
      <p className="mb-6 text-lg leading-relaxed">Protect your plants with these natural solutions: neem oil, insecticidal soap, diatomaceous earth, and companion planting.</p>
      <h2 className="mt-8 text-2xl font-semibold">Neem Oil Spray</h2>
      <p className="mb-4">Mixes with water to create a broad-spectrum insect deterrent—apply every 7–14 days.</p>
      <h2 className="mt-8 text-2xl font-semibold">Companion Planting</h2>
      <p className="mb-4">Use marigolds to deter nematodes, basil to repel thrips, and nasturtiums to trap aphids.</p>
      {/* More content... */}
    </article>
  );
}