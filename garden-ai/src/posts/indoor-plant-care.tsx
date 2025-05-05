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
      {/* Article Header */}
      <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">The Ultimate Guide to Thriving Indoor Plants: Care Tips for Every Home</h1>
            <p className="text-gray-600 text-lg">Transform your living space into a green oasis with healthy, happy houseplants.</p>
          </header>

          {/* Introduction */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold prose-h1:font-bold">
            <p>Bringing the outdoors in with houseplants does more than just beautify your space; it can boost your mood, purify the air, and create a calming atmosphere. But transforming your home into a lush jungle requires more than just good intentions. Understanding the fundamental needs of your green companions is key to helping them not just survive, but truly thrive. Whether you&apos;re a seasoned plant parent or just starting your indoor gardening journey, this comprehensive guide will walk you through the essential aspects of indoor plant care.</p>
            <p>From deciphering light levels to mastering the art of watering, choosing the right soil, and tackling common pests, we&apos;ll cover everything you need to know. Get ready to cultivate your green thumb and enjoy the rewarding experience of watching your indoor plants flourish!</p>
          </section>

          {/* Section 1: Choosing the Right Plant */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 1: Choosing the Right Plant - Setting Yourself Up for Success</h2>
            <p>The journey to successful plant parenthood begins with selecting a plant that suits your home environment and lifestyle. Not all plants are created equal, and matching a plant to the conditions you can provide is the most crucial first step.</p>

            <h3>Assess Your Light</h3>
            <p>Before you even browse for plants, take stock of the natural light in your home. Observe different rooms at various times of the day. Are there bright, sunny windows? Or mostly shadier spots? We&apos;ll delve deeper into light levels in the next section, but having a general idea is essential for choosing compatible plants.</p>

            <h3>Consider Your Experience Level</h3>
            <p>Be honest about the time and attention you can dedicate. If you&apos;re a beginner or have a busy schedule, start with forgiving, low-maintenance plants.</p>
            <ul>
              <li><strong>Beginner-Friendly Champions:</strong> Snake Plant (Sansevieria), ZZ Plant (Zamioculcas zamiifolia), Pothos (Epipremnum aureum), Spider Plant (Chlorophytum comosum), Cast Iron Plant (Aspidistra elatior). These are known for their tolerance of lower light, infrequent watering, and general neglect.</li>
              <li><strong>Intermediate Options:</strong> Peace Lily (Spathiphyllum), Philodendrons, Dracaena species, Rubber Plant (Ficus elastica). These might require slightly more specific care but are still relatively robust.</li>
              <li><strong>For the More Adventurous:</strong> Fiddle Leaf Fig (Ficus lyrata), Calathea species, Orchids, Alocasia species. These often have more demanding light, humidity, or watering needs.</li>
            </ul>

            <h3>Space and Size</h3>
            <p>Think about where the plant will live. Do you have floor space for a large statement plant, or are you looking for something for a shelf or windowsill? Consider the plant&apos;s mature size – that cute little succulent could eventually need much more room.</p>

            <h3>Pets and Children</h3>
            <p>Many common houseplants are toxic if ingested by pets or children. If you have curious cats, dogs, or little ones, research plant toxicity before buying. The ASPCA website has an extensive list of toxic and non-toxic plants. Safe options include Spider Plants, Prayer Plants (Maranta), Haworthia succulents, Areca Palms, and Boston Ferns.</p>

            <h3>Read Plant Tags and Research</h3>
            <p>Don&apos;t just buy a plant because it looks pretty. Read the care tag (if available) and do a quick online search for its specific needs regarding light, water, and soil. This small effort upfront can save a lot of guesswork later.</p>
          </section>

          {/* Section 2: Light Requirements */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 2: Let There Be Light (But Not Too Much!) - Understanding Light Needs</h2>
            <p>Light is arguably the most critical factor for indoor plant health, as it&apos;s how they produce energy through photosynthesis. Providing the *right amount* of light is essential.</p>

            <h3>Decoding Light Levels</h3>
            <p>Indoor light is often categorized as follows:</p>
            <ul>
              <li><strong>Low Light:</strong> Areas far from windows, north-facing windows, or corners of rooms. Plants may survive here, but growth will be slow. Tolerant plants: Snake Plant, ZZ Plant, Cast Iron Plant, some Pothos varieties.</li>
              <li><strong>Medium Light:</strong> Near an east-facing window, or several feet back from a south- or west-facing window. Light is bright but not direct sun for most of the day. Many popular houseplants thrive here: Philodendrons, Dracaena, Spider Plants, Peace Lilies.</li>
              <li><strong>Bright Indirect Light:</strong> Close to a south- or west-facing window but shielded from direct sun by a sheer curtain, blinds, or positioned just outside the direct rays. This is the sweet spot for a vast number of tropical plants: Fiddle Leaf Figs, Monsteras, Rubber Plants, Prayer Plants, most Ferns.</li>
              <li><strong>Direct Light (Bright Light):</strong> Several hours of direct, unfiltered sunlight, typically near a south- or west-facing window. Ideal for sun-loving plants: Cacti, Succulents, Crotons, Bird of Paradise. Be aware that intense afternoon sun can scorch the leaves of many plants not adapted to it.</li>
            </ul>

            <h3>Positioning Your Plants</h3>
            <ul>
              <li><strong>Window Direction Matters:</strong> North-facing windows provide the least light. East-facing windows offer gentle morning sun (good medium/bright indirect). South-facing windows provide strong, bright light all day. West-facing windows offer intense afternoon sun.</li>
              <li><strong>Distance from Window:</strong> Light intensity drops dramatically with distance. A plant a few feet away receives significantly less light than one right on the windowsill.</li>
              <li><strong>Obstructions:</strong> Trees, buildings, eaves, or even sheer curtains significantly reduce light levels.</li>
            </ul>

            <h3>Signs of Improper Lighting</h3>
            <ul>
              <li><strong>Too Little Light:</strong> Leggy growth (long stems with few leaves), small leaves, pale green or yellowing leaves (especially older ones), lack of flowering, leaning towards the light source.</li>
              <li><strong>Too Much Light:</strong> Scorched brown or yellow patches on leaves, crispy leaf edges, faded leaf color, wilting even when watered.</li>
            </ul>
            <p><strong>Tip:</strong> Rotate your plants regularly (e.g., a quarter turn each time you water) to ensure all sides receive light and promote even growth.</p>
          </section>

          {/* Section 3: Watering Wisely */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 3: H2O Know-How - Mastering the Art of Watering</h2>
            <p>Watering issues – specifically overwatering – are perhaps the most common cause of indoor plant demise. Finding the right balance is crucial for root health and overall plant vitality.</p>

            <h3>Why Proper Watering Matters</h3>
            <p>Plant roots need a balance of moisture and oxygen. Overwatering saturates the soil, cutting off oxygen supply, leading to root rot (a fungal disease that kills roots). Underwatering stresses the plant, hindering growth and causing wilting or leaf drop.</p>

            <h3>Ditch the Schedule, Check the Soil!</h3>
            <p>The biggest mistake is watering on a fixed schedule (e.g., &quot;every Saturday&quot;). A plant&apos;s water needs fluctuate based on light, temperature, humidity, pot size, soil type, and growth rate. Instead, learn to check the soil moisture:</p>
            <ul>
              <li><strong>The Finger Test:</strong> Stick your index finger into the soil up to the first or second knuckle. If it feels dry at that depth, it&apos;s likely time to water. If it feels moist, wait longer.</li>
              <li><strong>Moisture Meter:</strong> A simple tool you insert into the soil to get a reading (dry, moist, wet). Can be helpful, especially for larger pots, but always use it as a guide alongside your own judgment.</li>
              <li><strong>Pot Weight:</strong> Learn the weight difference between a freshly watered pot and a dry one. Lift the pot – if it feels significantly lighter than usual, it probably needs water.</li>
            </ul>

            <h3>Watering Techniques</h3>
            <ul>
              <li><strong>Top Watering:</strong> Pour water slowly and evenly over the soil surface until it drains freely from the bottom drainage holes. This ensures the entire root ball is moistened and helps flush out excess salts. Discard any water that collects in the saucer after 15-30 minutes; don&apos;t let the plant sit in standing water.</li>
              <li><strong>Bottom Watering:</strong> Place the pot in a sink or basin filled with a few inches of water. Allow the plant to soak up water through the drainage holes for 15-30 minutes, or until the topsoil feels moist. This encourages deeper root growth and is great for plants sensitive to wet leaves (like African Violets).</li>
            </ul>

            <h3>Factors Affecting Watering Frequency</h3>
            <ul>
              <li><strong>Light:</strong> Plants in brighter light use more water.</li>
              <li><strong>Temperature & Humidity:</strong> Warmer temps and lower humidity increase water needs.</li>
              <li><strong>Pot Type & Size:</strong> Terracotta pots dry out faster than plastic or glazed ceramic. Smaller pots dry out faster than larger ones.</li>
              <li><strong>Soil Type:</strong> Well-draining mixes dry faster than dense, water-retentive ones.</li>
              <li><strong>Time of Year:</strong> Plants typically need less water during dormant periods (fall/winter) when growth slows.</li>
            </ul>

            <h3>Signs of Watering Issues</h3>
            <ul>
              <li><strong>Overwatering:</strong> Yellowing lower leaves, mushy stems, wilting (despite moist soil), moldy soil surface, fungus gnats, root rot (brown, mushy roots).</li>
              <li><strong>Underwatering:</strong> Wilting, dry/crispy leaf edges, brown leaf tips, drooping leaves, slow growth, soil pulling away from the pot edges.</li>
            </ul>
            <p><strong>Water Quality Tip:</strong> Tap water is usually fine, but if yours is very hard (high mineral content) or treated with chlorine/fluoride, letting it sit out overnight can help dissipate some chlorine. Using filtered or rainwater is ideal if you notice mineral buildup or sensitivity.</p>
          </section>

          {/* Section 4: Soil and Potting */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 4: Getting Your Hands Dirty - Soil, Pots, and Repotting</h2>
            <p>The right foundation is essential. Choosing appropriate potting mix and containers, and knowing when to repot, provides the support and environment your plant&apos;s roots need to thrive.</p>

            <h3>The Importance of Good Potting Mix</h3>
            <p>Avoid using garden soil for indoor plants! It&apos;s too dense, compacts easily, doesn&apos;t drain well, and can harbor pests and diseases. Use a quality commercial potting mix specifically designed for houseplants.</p>
            <ul>
              <li><strong>Components:</strong> Most mixes contain peat moss or coco coir (for moisture retention), perlite or pumice (for aeration and drainage), vermiculite (moisture and nutrient retention), and sometimes compost or worm castings (for nutrients).</li>
              <li><strong>Specialty Mixes:</strong> You can find mixes tailored for specific plant types:
                  <ul>
                    <li><strong>Cactus/Succulent Mix:</strong> Very gritty and fast-draining, often containing more sand or perlite.</li>
                    <li><strong>Orchid Mix:</strong> Very chunky, usually bark-based, providing maximum aeration for orchid roots.</li>
                    <li><strong>African Violet Mix:</strong> Light, airy, and moisture-retentive but well-draining.</li>
                  </ul>
              </li>
              <li><strong>DIY Mixes:</strong> As you gain experience, you can create custom mixes by combining ingredients like standard potting soil, perlite, orchid bark, coco coir, charcoal, and worm castings to suit specific plant needs.</li>
            </ul>

            <h3>Choosing the Right Pot</h3>
            <ul>
              <li><strong>Drainage is Non-Negotiable:</strong> Ensure the pot has drainage holes at the bottom. Without them, water accumulates, leading to root rot. If you love a decorative pot without holes (a cachepot), keep the plant in its plastic nursery pot with drainage and place that inside the cachepot. Remove the inner pot for watering or empty the cachepot shortly after.</li>
              <li><strong>Size Matters:</strong> Don&apos;t put a small plant in a huge pot. Excess soil holds moisture for too long, increasing rot risk. When repotting, typically choose a pot only 1-2 inches larger in diameter than the current one.</li>
              <li><strong>Material Considerations:</strong>
                  <ul>
                    <li><strong>Terracotta (Clay):</strong> Porous, allows air and moisture exchange, dries out faster. Good for succulents, cacti, and plants prone to overwatering, but requires more frequent watering.</li>
                    <li><strong>Plastic:</strong> Lightweight, inexpensive, retains moisture longer. Good for moisture-loving plants or if you tend to underwater.</li>
                    <li><strong>Glazed Ceramic:</strong> Retains moisture like plastic but is heavier and often more decorative.</li>
                  </ul>
              </li>
            </ul>

            <h3>Repotting: When and How</h3>
            <p>Plants eventually outgrow their pots or deplete the nutrients in their soil. Repotting provides fresh soil and more room for roots.</p>
            <ul>
              <li><strong>Signs It&apos;s Time:</strong> Roots growing out of drainage holes, roots circling densely inside the pot (rootbound), water running straight through without soaking in, slowed growth (despite good care), plant becoming top-heavy and unstable.</li>
              <li><strong>Best Timing:</strong> Spring or early summer when the plant is actively growing. Avoid repotting stressed or dormant plants.</li>
              <li><strong>How to Repot:</strong>
                <ol className="list-decimal ml-6">
                  <li>Water the plant thoroughly a day or two before repotting to ease removal.</li>
                  <li>Gently tip the pot sideways and slide the plant out. If stuck, run a knife around the inside edge.</li>
                  <li>Inspect the roots. Gently loosen any tightly bound roots with your fingers. Prune any dead, mushy, or circling roots with clean scissors.</li>
                  <li>Add a layer of fresh potting mix to the bottom of the new, slightly larger pot (with drainage!).</li>
                  <li>Place the plant in the new pot, ensuring the top of the root ball is about an inch below the rim.</li>
                  <li>Fill in around the root ball with fresh potting mix, gently firming it down to remove air pockets, but don&apos;t pack too tightly.</li>
                  <li>Water thoroughly until water drains from the bottom.</li>
                  <li>Place the plant back in its appropriate light conditions. Avoid fertilizing for several weeks as the fresh mix has nutrients and roots need time to recover.</li>
                </ol>
              </li>
            </ul>
          </section>

          {/* Section 5: Humidity and Temperature */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 5: Creating the Right Atmosphere - Humidity and Temperature</h2>
            <p>Many popular houseplants originate from tropical regions with high humidity and stable temperatures. Replicating these conditions, or at least mitigating the dry air common in homes (especially with heating/cooling systems), can significantly benefit your plants.</p>

            <h3>Ideal Temperature Ranges</h3>
            <p>Most common houseplants thrive in typical indoor temperatures between 65-75°F (18-24°C). Avoid placing plants near extreme temperature fluctuations:</p>
            <ul>
              <li>Drafty windows or doors</li>
              <li>Heating vents or radiators</li>
              <li>Air conditioning units</li>
              <li>Sudden temperature drops below 50-55°F (10-13°C) can damage many tropical plants.</li>
            </ul>

            <h3>The Importance of Humidity</h3>
            <p>Indoor air, particularly in winter when heating systems run, is often much drier than ideal for tropical plants. Low humidity can cause:</p>
            <ul>
              <li>Brown, crispy leaf tips and edges</li>
              <li>Yellowing leaves</li>
              <li>Stunted growth</li>
              <li>Increased susceptibility to pests like spider mites.</li>
            </ul>

            <h3>Ways to Increase Humidity</h3>
            <ul>
              <li><strong>Grouping Plants:</strong> Plants naturally release moisture through transpiration. Grouping them together creates a more humid microclimate.</li>
              <li><strong>Pebble Trays:</strong> Place the pot on a tray filled with pebbles and water. Ensure the bottom of the pot sits on the pebbles, *above* the water level, so it&apos;s not soaking. As the water evaporates, it increases humidity around the plant.</li>
              <li><strong>Misting:</strong> Spraying leaves with water provides a *temporary* humidity boost. It needs to be done frequently (often multiple times a day) to be truly effective and isn&apos;t ideal for plants prone to fungal issues or those with fuzzy leaves (like African Violets).</li>
              <li><strong>Humidifiers:</strong> A small room humidifier placed near your plants is one of the most effective ways to consistently raise humidity levels.</li>
              <li><strong>Location Choice:</strong> Bathrooms and kitchens often have naturally higher humidity levels, making them good locations for humidity-loving plants (provided light is adequate).</li>
            </ul>
            <p><strong>Plants that Crave Humidity:</strong> Ferns, Calatheas, Marantas (Prayer Plants), Alocasias, Orchids, Air Plants (Tillandsia).</p>
            <p><strong>Plants Tolerant of Lower Humidity:</strong> Cacti, Succulents, Snake Plants, ZZ Plants, Cast Iron Plants, Pothos.</p>
          </section>

          {/* Section 6: Feeding Your Plants */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 6: Plant Nutrition - Feeding Your Green Friends</h2>
            <p>While potting mix provides initial nutrients, plants eventually use them up. Fertilizing replenishes essential minerals needed for healthy growth, strong leaves, and vibrant flowers.</p>

            <h3>Why Fertilize?</h3>
            <p>Fertilizers provide macronutrients (Nitrogen - N, Phosphorus - P, Potassium - K) and micronutrients (iron, magnesium, manganese, etc.) that plants need for various functions like chlorophyll production, root development, and flowering.</p>

            <h3>Types of Fertilizers</h3>
            <ul>
              <li><strong>Liquid Fertilizers:</strong> Mixed with water and applied during watering. Provide nutrients quickly but need regular application. Easy to control dosage.</li>
              <li><strong>Granular Slow-Release Fertilizers:</strong> Pellets mixed into the soil or sprinkled on top. Release nutrients gradually over weeks or months as you water. Convenient but harder to control precise dosage.</li>
              <li><strong>Fertilizer Spikes/Sticks:</strong> Inserted into the soil. Release nutrients over time, but distribution might not be even throughout the root zone.</li>
              <li><strong>Organic Options:</strong> Worm castings, compost tea, fish emulsion. Generally release nutrients more slowly and improve soil health. Can sometimes have an odor (fish emulsion).</li>
            </ul>
            <p><strong>Understanding N-P-K Ratios:</strong> Fertilizer labels show three numbers (e.g., 10-10-10 or 5-10-5). These represent the percentage by weight of Nitrogen (leaf growth), Phosphorus (root/flower/fruit development), and Potassium (overall plant health). A balanced fertilizer (like 10-10-10) is suitable for many houseplants. Formulas higher in nitrogen promote foliage, while those higher in phosphorus encourage blooms.</p>

            <h3>When and How Often to Feed</h3>
            <ul>
              <li><strong>Growing Season is Key:</strong> Most houseplants benefit from feeding during their active growing season (typically spring and summer).</li>
              <li><strong>Reduce or Stop in Fall/Winter:</strong> As growth slows, nutrient needs decrease. Stop fertilizing or reduce frequency significantly during dormancy.</li>
              <li><strong>Follow Label Instructions:</strong> Dosage and frequency vary by product. It&apos;s crucial to follow the directions on the fertilizer package.</li>
              <li><strong>Less is More:</strong> It&apos;s better to under-fertilize than over-fertilize. Over-fertilizing can burn roots and damage the plant. Many experts recommend diluting liquid fertilizers to half or quarter strength of the recommended dose, especially if feeding frequently.</li>
              <li><strong>Don&apos;t Fertilize Stressed Plants:</strong> Avoid feeding newly repotted, diseased, pest-infested, or severely underwatered plants. Let them recover first.</li>
            </ul>

            <h3>Signs of Nutrient Issues</h3>
            <ul>
              <li><strong>Deficiency:</strong> Slow/stunted growth, pale or yellowing leaves (especially older ones), lack of flowering.</li>
              <li><strong>Excess (Fertilizer Burn):</strong> Brown leaf tips/edges, white crusty buildup on soil surface or pot rim, wilting, root damage. Flush the soil thoroughly with water if you suspect over-fertilization.</li>
            </ul>
          </section>

          {/* Section 7: Pruning and Maintenance */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 7: Tidy Up Time - Pruning and General Maintenance</h2>
            <p>Regular upkeep keeps your plants looking their best, encourages healthy growth, and helps prevent problems.</p>

            <h3>Benefits of Pruning</h3>
            <ul>
              <li><strong>Removes Dead/Yellowing Leaves:</strong> Improves appearance and prevents potential disease spread.</li>
              <li><strong>Encourages Bushier Growth:</strong> Pinching back tips on vining or branching plants (like Pothos, Philodendrons) encourages side shoots, resulting in a fuller plant.</li>
              <li><strong>Controls Size/Shape:</strong> Keep plants from getting too large or leggy.</li>
              <li><strong>Promotes Flowering:</strong> Removing spent blooms (deadheading) can encourage some plants to produce more flowers.</li>
            </ul>

            <h3>How to Prune</h3>
            <ul>
              <li><strong>Use Clean, Sharp Tools:</strong> Use sharp scissors, pruners, or even your fingernails (for soft stems). Clean tools with rubbing alcohol between plants, especially if removing diseased parts.</li>
              <li><strong>Cut Above a Node:</strong> When trimming stems, make the cut just above a node (the point where a leaf attaches or a bud forms). This is where new growth will emerge.</li>
              <li><strong>Remove Yellow/Brown Leaves:</strong> Cut these off at the base of the leaf stem (petiole) or back to the main stem.</li>
              <li><strong>Don&apos;t Overdo It:</strong> Avoid removing more than 25-30% of the plant&apos;s foliage at one time, as this can stress it.</li>
            </ul>

            <h3>Cleaning Leaves</h3>
            <p>Dust accumulating on leaves blocks light and can harbor pests. Clean leaves regularly:</p>
            <ul>
              <li><strong>Wipe Gently:</strong> Use a soft, damp cloth or sponge to wipe down smooth leaves. Support the leaf from underneath with your other hand.</li>
              <li><strong>Shower Power:</strong> Give plants a gentle lukewarm shower in the sink or bathtub occasionally to wash away dust. Avoid this for fuzzy-leaved plants.</li>
              <li><strong>Soft Brush:</strong> Use a soft brush (like a makeup brush) for fuzzy leaves (e.g., African Violets).</li>
            </ul>

            <h3>Other Maintenance Tasks</h3>
            <ul>
              <li><strong>Check for Pests Regularly:</strong> Inspect leaves (especially undersides), stems, and soil when watering. Early detection is key.</li>
              <li><strong>Rotate Plants:</strong> Ensure even growth by giving plants a quarter turn regularly.</li>
              <li><strong>Provide Support:</strong> Stake or trellis climbing or top-heavy plants as needed.</li>
            </ul>
          </section>

          {/* Section 8: Common Indoor Plant Pests & Problems */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-3 mb-6">Section 8: Troubleshooting - Common Pests and Problems</h2>
            <p>Even with the best care, problems can arise. Knowing how to identify and address common issues is part of being a plant parent.</p>

            <h3>Common Indoor Pests</h3>
            <p>Inspect new plants carefully before bringing them home! Isolate any infested plants immediately to prevent spreading.</p>
            <ul>
              <li><strong>Spider Mites:</strong> Tiny arachnids, often hard to see. Look for fine webbing between leaves/stems, stippling (tiny yellow/white dots) on leaves. Thrive in dry conditions.
                  <ul><li><strong>Treatment:</strong> Increase humidity, wipe leaves thoroughly, spray forcefully with water, use insecticidal soap or neem oil. Repeat treatments are necessary.</li></ul>
              </li>
              <li><strong>Mealybugs:</strong> Small, white, cottony-looking insects often found in leaf axils or on stems. They suck sap.
                  <ul><li><strong>Treatment:</strong> Dab individual bugs with a cotton swab dipped in rubbing alcohol (test on a small area first). Wipe leaves, spray with insecticidal soap or neem oil.</li></ul>
              </li>
              <li><strong>Scale:</strong> Look like small, immobile bumps (tan, brown, or black) on stems and leaves. They have a hard, protective coating.
                  <ul><li><strong>Treatment:</strong> Scrape off gently with a fingernail or toothbrush. Treat with horticultural oil or neem oil (which suffocates them). Systemic insecticides may be needed for heavy infestations.</li></ul>
              </li>
              <li><strong>Fungus Gnats:</strong> Small, dark flies resembling fruit flies, often seen flying around the soil surface. Larvae live in moist topsoil and feed on fungi/organic matter (and sometimes roots). Usually indicate overwatering.
                  <ul><li><strong>Treatment:</strong> Let the top few inches of soil dry out completely between waterings. Use yellow sticky traps to catch adults. Water with Bti (Bacillus thuringiensis israelensis) solution to kill larvae.</li></ul>
              </li>
              <li><strong>Aphids:</strong> Small, pear-shaped insects (often green, black, or brown) that cluster on new growth and suck sap.
                  <ul><li><strong>Treatment:</strong> Strong water spray, wipe off, insecticidal soap, neem oil.</li></ul>
              </li>
            </ul>
            <p><strong>Organic Pest Control Indoors:</strong> Focus on physical removal (wiping, spraying water), rubbing alcohol for spot treatment, insecticidal soap, neem oil, and horticultural oil. Always follow label directions and test sprays on a small leaf area first.</p>

            <h3>Common Leaf Problems (and Likely Causes)</h3>
            <ul>
              <li><strong>Yellowing Lower Leaves:</strong> Often overwatering, but can also be natural aging or nitrogen deficiency.</li>
              <li><strong>Brown Crispy Leaf Tips/Edges:</strong> Usually low humidity, underwatering, or salt buildup from fertilizer/hard water.</li>
              <li><strong>Brown/Black Mushy Spots:</strong> Likely overwatering or fungal disease (often related to overwatering).</li>
              <li><strong>Pale/Faded Leaves:</strong> Too much direct light or sometimes nutrient deficiency.</li>
              <li><strong>Wilting:</strong> Most often underwatering, but can *also* be caused by overwatering (due to root rot preventing water uptake). Always check soil moisture!</li>
              <li><strong>Leaf Drop:</strong> Can be caused by sudden changes in light, temperature, watering, drafts, or repotting shock.</li>
            </ul>
            <p>Troubleshooting often involves reviewing the basics: light, water, humidity, and checking for pests. Adjust care accordingly.</p>
          </section>

          {/* Conclusion */}
          <footer className="mt-12 pt-6 border-t prose max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h2:font-semibold prose-p:mb-4 prose-p:leading-relaxed">
            <h2>Conclusion: Enjoy Your Indoor Jungle!</h2>
            <p>Caring for indoor plants is a rewarding hobby that brings life and beauty into our homes. While it might seem daunting at first, understanding the core principles of light, water, soil, and general maintenance will empower you to provide the right care. Remember that observation is your best tool – pay attention to your plants, learn their individual quirks, and don&apos;t be afraid to adjust your approach. Mistakes happen, but each one is a learning opportunity. With patience and consistent care, you can cultivate a thriving indoor garden that brings you joy for years to come. Happy planting!</p>
          </footer>
    </article>
  );
}