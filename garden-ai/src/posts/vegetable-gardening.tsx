export const metadata = {
  title: 'Seasonal Vegetable Gardening Calendar',
  description: 'A month-by-month guide to planting, growing, and harvesting your vegetable garden.'
};
export default function VegetableGardening() {
  return (
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      <h1 className="text-4xl font-extrabold mb-4">Seasonal Vegetable Gardening Calendar</h1>
      <p className="mb-6 text-lg leading-relaxed">Plan your garden with our easy-to-follow calendar. From early spring seed starting to late fall harvests, we&apos;ve got you covered.</p>
      <h2 className="mt-8 text-2xl font-semibold">Spring Planting</h2>
      <p className="mb-4">Sow seeds of peas, lettuce, and spinach 2–4 weeks before the last frost date. Use row covers for extra protection.</p>
      <h2 className="mt-8 text-2xl font-semibold">Summer Care</h2>
      <p className="mb-4">Maintain consistent watering, mulch to retain moisture, and watch for pests like aphids and squash bugs.</p>
      {/* More content... */}
    </article>
  );
}