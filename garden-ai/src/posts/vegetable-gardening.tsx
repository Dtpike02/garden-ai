import Image from "next/image";

export const metadata = {
  title: 'Seasonal Vegetable Gardening Calendar',
  description: 'A month-by-month guide to planting, growing, and harvesting your vegetable garden.'
};
export default function VegetableGardening() {
  return (
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      {/* Hero Image */}
      <Image
        width={800}
        height={400}
        src="/images/vegetable-garden-hero.jpg"
        alt="Lush vegetable garden in full bloom"
        className="w-full h-64 object-cover rounded-md mb-8"
      />
      <h1 className="text-4xl font-extrabold mb-4">Seasonal Vegetable Gardening Calendar</h1>
      <p className="mb-6 text-lg leading-relaxed">
        Growing your own food is rewarding and delicious! This 12-month calendar guides you on what to plant, when to tend, and how to harvest for peak flavor. Ready your trowel and let’s dig in.
      </p>

      {/* Section: January–March Planning */}
      <h2 className="mt-12 text-2xl font-semibold">January–March: Early Planning & Indoor Starts</h2>
      <p className="mb-4">
        While snow may cover your beds, you can start seeds indoors: tomatoes, peppers, and eggplants benefit from an early head start under grow lights.
      </p>
      <Image
        width={800}
        height={400}
        src="/images/seed-start.jpg"
        alt="Seedlings under grow lights"
        className="w-full h-48 object-cover rounded-md my-6"
      />

      {/* Continue with April–June, July–September, October–December sections, each ~300-400 words */}
      {/* Insert photos at key points: planting trays, watering setup, harvesting basket, compost pile */}

      {/* Placeholder: Flesh out each seasonal section with planting schedules, care tips, companion planting guides, and pest watch lists */}
      {/* Include a downloadable PDF link photo placeholder: */}
      {/* <a href="/downloads/vegetable-calendar.pdf"><img src="/images/download-calendar.jpg" alt="Download Vegetable Calendar PDF" /></a> */}

      {/* FAQ and Resources section at end, including photo icons for each resource */}
    </article>
  );
}
