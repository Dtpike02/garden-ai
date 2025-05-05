import Image from "next/image";

export const metadata = {
  title: 'Indoor Plant Care: The Complete Guide',
  description: 'Learn how to care for indoor plants—light, water, soil, and troubleshooting tips.'
};
export default function IndoorPlantCare() {
  return (
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      {/* Hero Image */}
      <Image
        src="/images/indoor-plant-hero.jpg"
        alt="A lush, bright indoor garden"
        className="w-full h-64 object-cover rounded-md mb-8"
        width={800}
        height={400}
      />
      <h1 className="text-4xl font-extrabold mb-4">Indoor Plant Care: The Complete Guide</h1>
      <p className="mb-6 text-lg leading-relaxed">
        Welcome to your one-stop resource for keeping houseplants happy and healthy! Whether you&apos;re a seasoned green thumb or a total newbie, this guide covers everything from lighting and watering to soil blends and troubleshooting 
        those mysterious yellow leaves. Let’s dive in with a lighthearted yet professional approach—because plant care should be fun, not a chore!
      </p>

      {/* Section: Choosing the Right Plant */}
      <h2 className="mt-12 text-2xl font-semibold">1. Choosing the Right Plant</h2>
      <p className="mb-4">
        Not all plants are created equal—some thrive in shade, others demand sunshine. Start by assessing your space: bright south windows? Low-light corners? From pothos to snake plants, we’ll recommend your perfect match.
      </p>
      {/* Photo: Plant variety collage */}
      <Image
        src="/images/plant-varieties.jpg"
        alt="Variety of indoor plant options"
        className="w-full h-48 object-cover rounded-md my-6"
        width={800}
        height={400}
      />
      <p className="mb-4">
        <strong>Top Picks for Beginners:</strong> Snake Plant, ZZ Plant, Pothos—virtually indestructible!<br />
        <strong>Brightlight Lovers:</strong> Fiddle Leaf Fig, Bird of Paradise, Succulents.<br />
        <strong>Lowlight Champs:</strong> Cast Iron Plant, Peace Lily, Chinese Evergreen.
      </p>

      {/* Section: Light Requirements */}
      <h2 className="mt-12 text-2xl font-semibold">2. Light Requirements</h2>
      <p className="mb-4">
        Light is the fuel of photosynthesis—no light, no life. We’ll explain foot-candles and why your fern might be complaining about its dim corner.
      </p>
      {/* Photo: Sunlight through window */}
      <Image
        src="/images/indoor-lighting.jpg"
        alt="Sunlight streaming through a window onto plants"
        className="w-full h-48 object-cover rounded-md my-6"
        width={800}
        height={400}  
      />
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Bright, Direct:</strong> 6+ hours—succulents and cacti love it.</li>
        <li><strong>Bright, Indirect:</strong> 4–6 hours—most tropicals prefer this.</li>
        <li><strong>Low Light:</strong> &lt; 4 hours—perfect for ferns and ZZ plants.</li>
      </ul>

      {/* Continue with Watering, Soil, Humidity, Fertilizing, Troubleshooting, and FAQs */}
      {/* Each section should include 300-400 words of detailed guidance, interspersed with illustrative photos like: */}
      {/* <img src="/images/watering-tip.jpg" alt="Proper watering technique" className="..." /> */}
      {/* <img src="/images/soil-mix.jpg" alt="Soil composition examples" className="..." /> */}
      {/* <img src="/images/pest-control.jpg" alt="Identifying common pests" className="..." /> */}

      {/* Placeholder: Insert extensive content here to reach 2000+ words, covering: */}
      {/* - Watering frequency and techniques */}
      {/* - Soil types and mix recipes */}
      {/* - Humidity hacks (grouping, pebble trays) */}
      {/* - Fertilizer schedules and types */}
      {/* - Common issues: yellow leaves, brown tips, pests, diseases */}
      {/* - Troubleshooting charts and tables */}
      {/* - FAQ section with at least 5 common questions */}
    </article>
  );
}