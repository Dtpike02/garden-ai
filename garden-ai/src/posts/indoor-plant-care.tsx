export const metadata = {
  title: 'Indoor Plant Care: The Complete Guide',
  description: 'Learn how to care for indoor plants—light, water, soil, and troubleshooting tips.'
};
export default function IndoorPlantCare() {
  return (
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      <h1 className="text-4xl font-extrabold mb-4">Indoor Plant Care: The Complete Guide</h1>
      <p className="mb-6 text-lg leading-relaxed">Caring for indoor plants requires attention to light, water, soil, and humidity. In this guide, you&apos;ll learn how to keep your houseplants thriving year-round.</p>
      <h2 className="mt-8 text-2xl font-semibold">Light Requirements</h2>
      <p className="mb-4">Most indoor plants prefer bright, indirect light. Place them near east- or west-facing windows, and rotate monthly for even growth.</p>
      <h2 className="mt-8 text-2xl font-semibold">Watering Tips</h2>
      <p className="mb-4">Allow the top 1&quot; of soil to dry out between waterings. Overwatering leads to root rot—learn more about moisture meters and drainage.</p>
      {/* More content... */}
    </article>
  );
}