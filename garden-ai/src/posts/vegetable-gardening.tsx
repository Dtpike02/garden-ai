// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";

export const metadata = {
  title: 'Seasonal Vegetable Gardening Calendar',
  description: 'Follow our month-by-month vegetable gardening calendar with expert tips on planting, care, and harvest to maximize your garden’s yield and flavor.'
};
export default function VegetableGardening() {

  const lastFrostApprox = "early May"; // Approximate last spring frost for Columbus, OH
  const firstFrostApprox = "mid-October"; // Approximate first fall frost for Columbus, OH
  return (
    <>
    <article className="prose lg:prose-xl mx-auto py-16 bg-white rounded-2xl shadow-lg overflow-hidden p-8">
      {/* Hero Image */}
            <Image
              width={1200}
              height={800}
              src="/veggie-garden.jpeg"
              alt="Natural pest control setup"
              className="w-full h-64 object-cover rounded-md mb-8"
            />
      {/* Article Header */}
      <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">The Complete Guide to Starting Your Own Vegetable Garden</h1>
            <p className="text-gray-600 text-lg">From planning and planting to harvesting delicious, homegrown produce.</p>
          </header>

          {/* Introduction */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold prose-h1:font-bold">
            <p>There&apos;s a unique satisfaction in stepping outside to harvest fresh vegetables, grown with your own hands, just moments before dinner. Starting a vegetable garden offers more than just delicious, healthy food; it connects you to the seasons, provides gentle exercise, reduces food miles, and offers a rewarding sense of accomplishment. Whether you have a sprawling backyard, a small patio, or just a sunny windowsill, you can experience the joy of growing your own food.</p>
            <p>This comprehensive guide will lead you through every step of the process, from initial planning and soil preparation to planting, nurturing your crops, managing challenges, and finally, reaping your delicious rewards. Let&apos;s dig in and cultivate your dream vegetable garden!</p>
          </section>

          {/* Section 1: Planning Your Vegetable Garden */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 1: Planning Your Vegetable Garden - Blueprint for Success</h2>
            <p>Careful planning is the cornerstone of a productive vegetable garden. Taking time to consider location, size, layout, and crop selection before you plant will save effort and increase your chances of a bountiful harvest.</p>

            <h3>Choosing the Right Location</h3>
            <p>Your garden&apos;s location is critical. Look for a spot that offers:</p>
            <ul>
              <li><strong>Sunlight (The #1 Factor):</strong> Most vegetables need at least 6-8 hours of direct sunlight per day to thrive. Fruiting vegetables like tomatoes, peppers, squash, and cucumbers are particularly sun-hungry. Leafy greens and root vegetables can often tolerate slightly less (4-6 hours), but more sun generally means better growth and yield. Observe potential spots throughout the day to accurately gauge sun exposure.</li>
              <li><strong>Water Access:</strong> Ensure your garden is close enough to a water source (hose spigot) for convenient watering, especially during dry spells. Lugging heavy watering cans long distances gets old fast!</li>
              <li><strong>Good Drainage:</strong> Avoid low-lying areas where water pools after rain. Vegetables hate sitting in soggy soil, which leads to root rot. If drainage is poor, consider raised beds or containers.</li>
              <li><strong>Level Ground:</strong> A relatively level site is easier to work with and prevents soil erosion.</li>
              <li><strong>Protection from Wind:</strong> Strong winds can damage young plants and dry out soil quickly. A fence, hedge, or building can offer some protection.</li>
              <li><strong>Away from Tree Roots:</strong> Large trees compete heavily for water and nutrients, making it difficult for vegetables to thrive nearby.</li>
            </ul>

            <h3>Deciding What to Grow</h3>
            <p>It&apos;s tempting to plant everything, but start realistically!</p>
            <ul>
              <li><strong>Start Small:</strong> Especially for beginners, a smaller, well-managed garden (e.g., 10x10 feet or a few raised beds/containers) is more rewarding than a large, overwhelming one. You can always expand next year.</li>
              <li><strong>Consider Your Climate & Season:</strong> Choose vegetables suited to your growing season length. Check your local frost dates (for Columbus, Ohio, the approximate last spring frost is {lastFrostApprox}, and the first fall frost is around {firstFrostApprox}). This determines when to plant cool-season crops (lettuce, spinach, peas, broccoli) and warm-season crops (tomatoes, peppers, beans, squash).</li>
              <li><strong>Grow What You Like to Eat:</strong> Focus on vegetables your family enjoys!</li>
              <li><strong>Space Requirements:</strong> Some vegetables (like squash, melons) sprawl, while others (like carrots, radishes) are compact. Match plants to your available space.</li>
              <li><strong>Beginner-Friendly Options:</strong> Lettuce, radishes, bush beans, peas, zucchini, cucumbers, cherry tomatoes, peppers are generally considered easier to grow.</li>
            </ul>

            <h3>Garden Size and Layout</h3>
            <ul>
              <li><strong>In-Ground Beds:</strong> Traditional method, requires good existing soil or significant amendment. Can be any shape or size. Rows are common, but intensive block planting can be more space-efficient.</li>
              <li><strong>Raised Beds:</strong> Excellent for areas with poor soil, poor drainage, or mobility issues. Allow you to control the soil mix completely. Typically 3-4 feet wide for easy reach from both sides. Can be made from wood, stone, concrete blocks, or purchased kits.</li>
              <li><strong>Containers:</strong> Perfect for patios, balconies, or small spaces. Almost any vegetable can be grown in a large enough container with good drainage. Requires more frequent watering and fertilizing. Choose pots appropriate for the mature size of the plant (e.g., 5-gallon bucket minimum for a tomato).</li>
              <li><strong>Square Foot Gardening (SFG):</strong> An intensive method using a grid (often 4x4 feet divided into 1-foot squares) to maximize yield in small spaces. Specific planting densities are recommended per square.</li>
            </ul>

            <h3>Crop Rotation Basics</h3>
            <p>Avoid planting the same vegetable family (e.g., tomatoes/peppers/eggplants are all nightshades) in the same spot year after year. Rotation helps prevent the buildup of soil-borne diseases and pests specific to that family and balances nutrient use. Plan a simple 3-4 year rotation if possible.</p>

            <h3>Succession Planting</h3>
            <p>Extend your harvest season by planting small batches of fast-maturing crops (like lettuce, radishes, beans) every 2-3 weeks instead of all at once. You can also follow early cool-season crops with warm-season ones in the same space.</p>
          </section>

          {/* Section 2: Preparing the Soil */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 2: Preparing the Soil - The Foundation for Growth</h2>
            <p>Healthy soil is the lifeblood of a productive vegetable garden. Investing time in soil preparation before planting pays dividends throughout the growing season.</p>

            <h3>Understanding Your Soil</h3>
            <p>Get to know your soil&apos;s texture:</p>
            <ul>
              <li><strong>Clay Soil:</strong> Heavy, sticky when wet, hard when dry. Holds moisture and nutrients well but drains poorly and can be difficult to work. Needs lots of organic matter to improve structure.</li>
              <li><strong>Sandy Soil:</strong> Gritty, drains very quickly, dries out fast, and doesn&apos;t hold nutrients well. Needs organic matter to improve water and nutrient retention.</li>
              <li><strong>Loam Soil:</strong> The ideal garden soil – a balanced mix of sand, silt, and clay. Crumbly texture, drains well but retains adequate moisture and nutrients. Even loam benefits from adding organic matter.</li>
            </ul>

            <h3>Soil Testing</h3>
            <p>A soil test is highly recommended, especially for new garden areas. It reveals:</p>
            <ul>
              <li><strong>pH Level:</strong> Most vegetables prefer slightly acidic to neutral soil (pH 6.0-7.0). A test shows if you need to add lime (to raise pH/make less acidic) or sulfur (to lower pH/make more acidic).</li>
              <li><strong>Nutrient Levels:</strong> Indicates deficiencies in major nutrients (N-P-K) and sometimes micronutrients, guiding your fertilization strategy.</li>
              <li><strong>Organic Matter Content:</strong> Shows how much organic material is present.</li>
              <li>You can get test kits from garden centers or, ideally, send a sample to your local cooperative extension office for detailed analysis and recommendations.</li>
            </ul>

            <h3>Improving Soil Structure and Fertility</h3>
            <p>The single best thing you can do for almost any soil type is add organic matter.</p>
            <ul>
              <li><strong>Compost:</strong> Decomposed organic material (kitchen scraps, yard waste) is &quot;black gold&quot; for gardens. Improves drainage in clay soil, water retention in sandy soil, adds nutrients, and feeds beneficial soil microbes. Spread 2-4 inches over the garden area and incorporate it into the top 6-12 inches of soil.</li>
              <li><strong>Aged Manure:</strong> Well-rotted (not fresh!) animal manure adds nutrients and organic matter. Ensure it&apos;s fully composted to avoid burning plants or introducing pathogens.</li>
              <li><strong>Cover Crops:</strong> Planting cover crops like rye, clover, or buckwheat and then tilling them in (&quot;green manure&quot;) adds organic matter and can improve soil structure.</li>
              <li><strong>Leaf Mold:</strong> Decomposed leaves create excellent soil conditioner.</li>
            </ul>

            <h3>Tilling vs. No-Till/Low-Till</h3>
            <ul>
              <li><strong>Tilling (Rototilling):</strong> Mechanically breaks up and mixes soil. Can incorporate amendments quickly and create a fine seedbed. However, it can destroy soil structure, harm earthworms and beneficial fungi, bring weed seeds to the surface, and increase erosion/compaction over time.</li>
              <li><strong>No-Till/Low-Till/Broadforking:</strong> Focuses on disturbing the soil as little as possible. Add amendments as top-dressing or gently work into the top few inches. Use a broadfork to loosen deeper soil without inverting layers. Promotes healthier soil structure and microbial life in the long run but may require more initial effort to establish beds.</li>
            </ul>

            <h3>Preparing the Beds</h3>
            <ul>
              <li><strong>Remove Existing Vegetation:</strong> Clear sod, weeds, and rocks from the garden area. Sod can be removed manually or smothered using cardboard/newspaper layers (sheet mulching) several months in advance.</li>
              <li><strong>Loosen the Soil:</strong> Whether tilling or using a digging fork/broadfork, loosen the soil to a depth of at least 8-12 inches to allow for good root penetration.</li>
              <li><strong>Incorporate Amendments:</strong> Spread compost and any other recommended amendments (based on soil test) over the loosened soil and mix them in.</li>
              <li><strong>Rake Smooth:</strong> Create a level, uniform surface for planting.</li>
            </ul>
          </section>

          {/* Section 3: Planting Your Vegetables */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 3: Planting Your Vegetables - Seeds, Starts, and Timing</h2>
            <p>With your garden planned and soil prepped, it&apos;s time for the exciting part – planting! Understanding the difference between seeds and starts, and planting at the right time, are key to getting your crops off to a good start.</p>

            <h3>Seeds vs. Starts (Transplants)</h3>
            <ul>
              <li><strong>Direct Sowing (Seeds):</strong> Planting seeds directly into the garden soil.
                  <ul>
                    <li><strong>Pros:</strong> Less expensive, wider variety available, avoids transplant shock.</li>
                    <li><strong>Cons:</strong> Requires proper soil temperature for germination, vulnerable to weather/pests when small, may need thinning.</li>
                    <li><strong>Best For:</strong> Root crops (carrots, beets, radishes - don&apos;t like roots disturbed), beans, peas, corn, cucumbers, squash, melons, spinach, lettuce (can be direct sown or started).</li>
                  </ul>
              </li>
              <li><strong>Transplants (Starts):</strong> Young plants started indoors or purchased from a nursery.
                  <ul>
                    <li><strong>Pros:</strong> Gives a head start on the season (especially for long-season crops), less vulnerable initially, avoids thinning.</li>
                    <li><strong>Cons:</strong> More expensive, potential for transplant shock, fewer varieties available than seeds.</li>
                    <li><strong>Best For:</strong> Tomatoes, peppers, eggplant, broccoli, cauliflower, cabbage, onions (often from sets), herbs, sometimes melons/cucumbers (use peat pots to minimize root disturbance).</li>
                  </ul>
              </li>
            </ul>

            <h3>Understanding Planting Times</h3>
            <p>Timing is crucial and depends on whether you&apos;re planting cool-season or warm-season crops, related to your local frost dates.</p>
            <ul>
              <li><strong>Frost Dates:</strong> Know your average last spring frost date and first fall frost date (For Columbus, OH: approx. last frost {lastFrostApprox}, first frost {firstFrostApprox}). These dates are averages; monitor local forecasts.</li>
              <li><strong>Cool-Season Crops:</strong> Tolerate light frost and prefer cooler temperatures. Plant in early spring (a few weeks before last frost) for a summer harvest, and again in late summer/early fall for a fall/winter harvest. Examples: Lettuce, spinach, kale, peas, radishes, beets, carrots, broccoli, cauliflower, cabbage, onions, garlic (plant garlic in fall).</li>
              <li><strong>Warm-Season Crops:</strong> Need warm soil and air temperatures; killed by frost. Plant *after* all danger of frost has passed and soil has warmed up (typically 1-2 weeks after last frost date). Examples: Tomatoes, peppers, eggplant, beans, corn, squash, cucumbers, melons, sweet potatoes.</li>
              <li><strong>Check Seed Packets/Plant Tags:</strong> They provide specific planting time recommendations relative to frost dates.</li>
            </ul>

            <h3>How to Sow Seeds</h3>
            <ul>
              <li><strong>Read Packet Instructions:</strong> Follow recommendations for planting depth, spacing, and thinning.</li>
              <li><strong>Prepare Seedbed:</strong> Ensure soil is loose, fine, and moist.</li>
              <li><strong>Plant at Correct Depth:</strong> General rule: plant seeds 2-3 times as deep as they are wide. Small seeds barely need covering.</li>
              <li><strong>Spacing:</strong> Sow seeds at the recommended spacing, or slightly closer and thin later.</li>
              <li><strong>Water Gently:</strong> Keep the seedbed consistently moist (but not waterlogged) until germination. Use a fine spray.</li>
              <li><strong>Thinning:</strong> Crucial for root crops and densely sown plants. Remove weaker seedlings to allow remaining ones proper space, light, and nutrients. Snip seedlings at soil level to avoid disturbing roots of neighbors.</li>
            </ul>

            <h3>How to Plant Transplants</h3>
            <ul>
              <li><strong>Hardening Off:</strong> ESSENTIAL step! Gradually acclimate indoor-grown starts to outdoor conditions (sun, wind, temperature fluctuations) over 7-10 days before planting. Start with 1-2 hours in shade, gradually increasing exposure time and intensity. Bring indoors if frost threatens.</li>
              <li><strong>Choose Overcast Day/Late Afternoon:</strong> Plant when conditions are cooler to reduce stress.</li>
              <li><strong>Water Before Planting:</strong> Water transplants well an hour or two before planting.</li>
              <li><strong>Handle Gently:</strong> Support the plant by the root ball, not the stem. Gently loosen any circling roots.</li>
              <li><strong>Planting Depth:</strong> Plant most vegetables at the same depth they were in their pot. Exception: Tomatoes can be planted deeper (burying part of the stem encourages more roots).</li>
              <li><strong>Backfill and Firm Soil:</strong> Fill the hole with soil, gently firming around the root ball to remove air pockets.</li>
              <li><strong>Water Thoroughly:</strong> Water well immediately after planting to settle the soil and hydrate roots. Consider using a diluted starter fertilizer solution (high in phosphorus).</li>
            </ul>
          </section>

          {/* Section 4: Watering Your Garden Effectively */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 4: Watering Your Garden Effectively - Quenching Thirst</h2>
            <p>Consistent and appropriate watering is vital for vegetable growth, fruit development, and overall plant health. Understanding how much, when, and how to water makes a big difference.</p>

            <h3>Importance of Consistent Watering</h3>
            <p>Water stress (too little or inconsistent) can lead to stunted growth, reduced yields, blossom end rot (in tomatoes/peppers), bitter cucumbers, and bolting (premature flowering) in leafy greens. Overwatering leads to root rot and fungal diseases.</p>

            <h3>How Much Water?</h3>
            <ul>
              <li><strong>General Guideline:</strong> Most vegetable gardens need about 1 inch of water per week, either from rain or irrigation. This translates to roughly 0.6 gallons per square foot.</li>
              <li><strong>Varies Widely:</strong> Needs depend on weather (hot, dry, windy weather increases needs), soil type (sandy soil needs more frequent watering than clay), and plant stage (seedlings and fruiting plants often need more).</li>
              <li><strong>Water Deeply:</strong> Aim to moisten the soil to a depth of 6-8 inches to encourage deep root growth. Shallow watering leads to shallow roots, making plants more susceptible to drought.</li>
            </ul>

            <h3>Best Time to Water</h3>
            <ul>
              <li><strong>Early Morning:</strong> This is ideal. It allows water to soak in before the heat of the day causes excessive evaporation, and gives foliage time to dry before nightfall, reducing disease risk.</li>
              <li><strong>Avoid Evening Watering (If Possible):</strong> Wet foliage overnight creates prime conditions for fungal diseases like powdery mildew and blight. If evening is your only option, focus water at the base of plants.</li>
            </ul>

            <h3>Watering Methods</h3>
            <ul>
              <li><strong>Soaker Hoses:</strong> Porous hoses laid along rows or beds that weep water slowly directly into the soil. Very efficient, minimizes evaporation and keeps foliage dry.</li>
              <li><strong>Drip Irrigation:</strong> Systems with emitters that deliver water slowly to the base of individual plants. Highly efficient and customizable, but more initial setup/cost.</li>
              <li><strong>Hand Watering (Watering Can/Wand):</strong> Allows precise control but can be time-consuming for larger gardens. Use a watering wand with a breaker to provide a gentle shower. Focus water at the base of the plants, soaking the root zone thoroughly. Avoid spraying foliage excessively.</li>
            </ul>

            <h3>Checking Soil Moisture</h3>
            <p>Don&apos;t rely solely on appearance; check the soil!</p>
            <ul>
              <li><strong>Finger Test:</strong> Stick your finger 2-3 inches into the soil near the plant roots. If it feels dry, it&apos;s time to water.</li>
              <li><strong>Observe Plants:</strong> Slight wilting in the afternoon heat can be normal (if soil is moist), but persistent wilting, especially in the morning, indicates a need for water.</li>
            </ul>
          </section>

          {/* Section 5: Feeding Your Crops */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 5: Feeding Your Crops - Garden Nutrition</h2>
            <p>While healthy soil provides a good start, most vegetables benefit from supplemental nutrients during the growing season, especially heavy feeders.</p>

            <h3>Role of Nutrients (N-P-K Recap)</h3>
            <ul>
              <li><strong>Nitrogen (N):</strong> Promotes leafy green growth.</li>
              <li><strong>Phosphorus (P):</strong> Essential for root development, flowering, and fruiting.</li>
              <li><strong>Potassium (K):</strong> Important for overall plant vigor, disease resistance, and fruit quality.</li>
              <li>Micronutrients (iron, calcium, magnesium, etc.) are also needed in smaller amounts.</li>
            </ul>

            <h3>Organic Fertilizing Options</h3>
            <p>Focus on feeding the soil, which in turn feeds the plants.</p>
            <ul>
              <li><strong>Compost/Aged Manure:</strong> Continue to top-dress beds with compost throughout the season or work it in lightly around plants. Provides slow-release nutrients and improves soil.</li>
              <li><strong>Balanced Organic Granular Fertilizer:</strong> Products derived from natural sources (like bone meal, blood meal, kelp, rock phosphate). Scratch into the soil surface around plants according to package directions. Releases nutrients gradually.</li>
              <li><strong>Liquid Organic Fertilizers:</strong> Fish emulsion, seaweed/kelp fertilizer, compost tea. Mix with water and apply as a soil drench or sometimes foliar spray. Provide nutrients more quickly. Useful for giving plants a boost.</li>
              <li><strong>Worm Castings:</strong> Excellent, nutrient-rich soil amendment and gentle fertilizer. Can be top-dressed or brewed into a tea.</li>
            </ul>

            <h3>When to Fertilize</h3>
            <ul>
              <li><strong>At Planting Time:</strong> Incorporate compost and potentially a balanced granular fertilizer into the soil before planting. A starter solution (high in phosphorus) can help transplants establish roots.</li>
              <li><strong>Side-Dressing:</strong> Applying fertilizer alongside rows or around plants during the growing season. Timing depends on the plant:
                  <ul>
                    <li><strong>Heavy Feeders:</strong> Tomatoes, peppers, corn, broccoli, cabbage, squash often benefit from side-dressing 1-2 times during peak growth/fruiting (e.g., when tomatoes start flowering/fruiting).</li>
                    <li><strong>Light Feeders:</strong> Beans, peas (legumes fix their own nitrogen), root crops generally need less supplemental fertilizer if soil is fertile.</li>
                    <li><strong>Leafy Greens:</strong> May benefit from a nitrogen boost mid-season if growth slows.</li>
                  </ul>
              </li>
              <li><strong>Follow Soil Test Recommendations:</strong> If you tested your soil, follow its specific guidance.</li>
            </ul>

            <h3>Avoiding Over-fertilization</h3>
            <p>Too much fertilizer, especially nitrogen, can harm plants. It can lead to excessive leafy growth with poor fruiting, fertilizer burn (scorched leaves, damaged roots), and potential environmental runoff. Always follow application rates and err on the side of less is more.</p>

            <h3>Signs of Nutrient Deficiencies</h3>
            <p>Specific symptoms can indicate deficiencies (e.g., yellowing between veins - magnesium; stunted growth - overall nutrients; purple leaves - phosphorus), but often general poor growth or pale leaves suggest a need for feeding. A soil test is the best diagnostic tool.</p>
          </section>

          {/* Section 6: Managing Pests and Diseases */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 6: Managing Pests, Diseases, and Weeds Organically</h2>
            <p>Dealing with unwanted visitors and ailments is part of gardening. An organic approach focuses on prevention, early detection, and using the least harmful methods first.</p>

            <h3>Integrated Pest Management (IPM) Principles</h3>
            <p>IPM is a smart, multi-faceted approach:</p>
            <ol className="list-decimal ml-6">
              <li><strong>Prevention:</strong> Healthy soil, resistant varieties, crop rotation, sanitation, attracting beneficials.</li>
              <li><strong>Observation & Monitoring:</strong> Regularly scout for pests and disease signs. Identify correctly!</li>
              <li><strong>Intervention (Least-Toxic First):</strong> Start with physical controls (handpicking, barriers, water sprays), then biological controls (beneficial insects), and only use targeted organic pesticides (soaps, oils, Bt) as a last resort for specific problems.</li>
            </ol>

            <h3>Common Garden Pests & Organic Controls</h3>
            <ul>
              <li><strong>Aphids:</strong> Small sap-suckers on new growth. Control: Strong water spray, insecticidal soap, neem oil, attract ladybugs/lacewings.</li>
              <li><strong>Caterpillars (Cabbage Worms, Hornworms, etc.):</strong> Chew leaves/fruit. Control: Handpick (drop in soapy water), use row covers on brassicas, apply Btk (Bacillus thuringiensis kurstaki).</li>
              <li><strong>Slugs & Snails:</strong> Chew holes in leaves, active at night/damp conditions. Control: Handpick, beer traps, copper tape barriers, diatomaceous earth (food grade), iron phosphate baits (safer organic option).</li>
              <li><strong>Squash Bugs:</strong> Sap-suckers on squash/pumpkins. Control: Handpick adults/nymphs, crush egg clusters (undersides of leaves), trap under boards overnight, keep garden clean. Difficult to control once established.</li>
              <li><strong>Cucumber Beetles:</strong> Chew leaves/flowers, transmit bacterial wilt. Control: Row covers until flowering, yellow sticky traps, handpick, organic pyrethrin-based sprays (use cautiously/sparingly).</li>
              <li><strong>Flea Beetles:</strong> Tiny black beetles chew small &quot;shotholes&quot; in leaves (eggplant, brassicas). Control: Row covers on young plants, sticky traps, dust with diatomaceous earth.</li>
            </ul>
             <p><strong>Attracting Beneficial Insects:</strong> Plant flowers like alyssum, dill, fennel, cosmos, yarrow to attract ladybugs, lacewings, parasitic wasps, hoverflies that prey on pests.</p>

            <h3>Common Diseases & Prevention</h3>
            <p>Many diseases are fungal or bacterial, thriving in damp conditions.</p>
            <ul>
              <li><strong>Prevention is Key:</strong>
                  <ul>
                    <li>Choose resistant varieties.</li>
                    <li>Ensure good air circulation (proper spacing).</li>
                    <li>Water at the base of plants, avoid wet foliage overnight.</li>
                    <li>Mulch to prevent soil splashing onto leaves.</li>
                    <li>Practice crop rotation.</li>
                    <li>Sanitation: Remove and destroy diseased plants promptly (do not compost). Clean tools.</li>
                  </ul>
              </li>
              <li><strong>Powdery Mildew:</strong> White powdery coating on leaves. Control: Improve air circulation, prune affected leaves, use organic fungicides (potassium bicarbonate, sulfur, neem oil - follow labels).</li>
              <li><strong>Early/Late Blight (Tomatoes):</strong> Fungal diseases causing leaf spots, yellowing, fruit rot. Control: Prevention is crucial (see above), copper-based organic fungicides can help slow spread if applied early.</li>
              <li><strong>Bacterial Wilt (Cucurbits):</strong> Transmitted by cucumber beetles. Plants wilt rapidly and die. Control: Manage cucumber beetles, remove infected plants immediately. No cure.</li>
            </ul>

            <h3>Weed Management</h3>
            <p>Weeds compete for water, light, and nutrients.</p>
            <ul>
              <li><strong>Mulching:</strong> Apply 2-3 inches of organic mulch (straw, shredded leaves, grass clippings - avoid treated grass) around plants to smother weeds and retain moisture.</li>
              <li><strong>Hand-Pulling/Hoeing:</strong> Remove weeds when they are small and soil is moist. Use a sharp hoe to slice weeds just below the soil surface.</li>
              <li><strong>Prevention:</strong> Avoid letting weeds go to seed. Use landscape fabric under paths.</li>
            </ul>
          </section>

          {/* Section 7: Garden Maintenance */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 7: Ongoing Garden Maintenance - Keeping Things Tidy</h2>
            <p>Consistent care throughout the season keeps your garden productive and healthy.</p>

            <h3>Mulching</h3>
            <p>Applying a layer of organic material over the soil surface is highly beneficial:</p>
            <ul>
              <li><strong>Benefits:</strong> Suppresses weeds, conserves soil moisture (reduces watering needs), regulates soil temperature (cooler in summer, warmer in winter), prevents soil compaction/erosion, adds organic matter as it breaks down.</li>
              <li><strong>Materials:</strong> Straw (seed-free), shredded leaves, grass clippings (apply thin layers, ensure they are herbicide-free), wood chips (better for paths than directly around annual veggies), compost.</li>
              <li><strong>Application:</strong> Apply a 2-4 inch layer around plants, keeping it pulled back slightly from plant stems to prevent rot.</li>
            </ul>

            <h3>Supporting Plants</h3>
            <p>Many vegetables need support to grow properly, keep fruit off the ground, and improve air circulation.</p>
            <ul>
              <li><strong>Tomatoes:</strong> Use stakes, cages (sturdy ones!), or trellises (like the Florida weave). Install supports early, ideally at planting time, to avoid root damage later.</li>
              <li><strong>Pole Beans & Peas:</strong> Provide trellises, netting, or poles for them to climb.</li>
              <li><strong>Cucumbers & Some Melons:</strong> Can be trained up trellises to save space and improve air circulation (may need slings to support heavy fruit).</li>
              <li><strong>Peppers & Eggplant:</strong> May benefit from small stakes or cages if heavily laden with fruit.</li>
            </ul>

            <h3>Pruning</h3>
            <p>Selective pruning can benefit certain vegetables:</p>
            <ul>
              <li><strong>Tomatoes:</strong> Removing lower leaves that touch the ground improves air circulation and reduces disease risk. Pruning &quot;suckers&quot; (shoots growing between the main stem and a branch) on indeterminate varieties can direct energy to fruit production and improve airflow (optional, depends on training method).</li>
              <li><strong>General:</strong> Remove any yellowing, dead, or diseased leaves promptly throughout the season.</li>
            </ul>

            <h3>Ongoing Observation</h3>
            <p>Walk through your garden regularly. Look for signs of pests, diseases, nutrient deficiencies, or water stress. Catching problems early makes them much easier to manage.</p>
          </section>

          {/* Section 8: Harvesting Your Bounty */}
          <section className="mb-8 prose max-w-none prose-li:mb-2 prose-p:mb-4 prose-p:leading-relaxed prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-semibold prose-h2:font-semibold">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-l-4 border-orange-600 pl-3 mb-6">Section 8: Harvesting Your Bounty - Reaping the Rewards</h2>
            <p>Harvesting is the culmination of your efforts! Knowing when and how to pick ensures the best flavor and encourages continued production.</p>

            <h3>Knowing When to Harvest</h3>
            <p>Signs of ripeness vary by vegetable:</p>
            <ul>
              <li><strong>Tomatoes:</strong> Fully colored (red, yellow, orange, etc., depending on variety) and slightly soft to the touch. Taste is the ultimate test!</li>
              <li><strong>Peppers:</strong> Can be harvested green (mature size) or allowed to fully ripen to red, yellow, or orange for sweeter flavor.</li>
              <li><strong>Cucumbers:</strong> Harvest when firm and smooth, before they turn yellow or bulge in the middle (which indicates seeds are maturing and flesh may become bitter). Size depends on variety (pickling vs. slicing).</li>
              <li><strong>Zucchini/Summer Squash:</strong> Best when young and tender. Harvest frequently, as they grow incredibly fast! Don&apos;t let them become giant baseball bats.</li>
              <li><strong>Bush/Pole Beans:</strong> Pick when pods are firm, crisp, and plump, but before seeds inside become overly large and tough. Snap easily.</li>
              <li><strong>Lettuce/Leafy Greens:</strong> Harvest outer leaves (&quot;cut-and-come-again&quot; method) as needed, allowing inner leaves to continue growing. Or harvest the whole head when mature.</li>
              <li><strong>Root Crops (Carrots, Beets, Radishes):</strong> Check size by gently brushing away soil at the shoulder. Harvest when roots reach desired size. Radishes become woody if left too long.</li>
              <li><strong>Broccoli:</strong> Harvest main head when buds are tightly closed and deep green, before flowers open (turn yellow). Side shoots may develop after main head is cut.</li>
            </ul>
            <p>Consult seed packets or online resources for specific indicators for each vegetable.</p>

            <h3>Harvesting Techniques</h3>
            <ul>
              <li><strong>Use Clean Tools:</strong> Use sharp scissors, pruners, or a knife for cleaner cuts, reducing damage to the plant.</li>
              <li><strong>Harvest Regularly:</strong> Frequent picking (especially beans, peas, zucchini, cucumbers) encourages the plant to produce more. Letting fruit over-ripen signals the plant to stop production.</li>
              <li><strong>Harvest in the Morning:</strong> Vegetables are often crispest and most hydrated after the cool night air.</li>
              <li><strong>Handle Gently:</strong> Avoid bruising or damaging produce during harvest.</li>
            </ul>

            <h3>Storing Fresh Produce</h3>
            <p>Storage methods vary. Some veggies (tomatoes, potatoes, onions, winter squash) store best at cool room temperature, while others (leafy greens, broccoli, beans, carrots) prefer refrigeration in perforated plastic bags or containers to maintain humidity.</p>
          </section>

          {/* Conclusion */}
          <footer className="mt-12 pt-6 border-t prose max-w-none prose-headings:mt-6 prose-headings:mb-3 prose-h2:text-3xl prose-h2:font-semibold prose-p:mb-4 prose-p:leading-relaxed">
            <h2>Conclusion: Enjoy the Fruits (and Veggies!) of Your Labor</h2>
            <p>Starting and maintaining a vegetable garden is a journey filled with learning, challenges, and immense rewards. From the first sprout pushing through the soil to the taste of a sun-warmed tomato picked straight from the vine, gardening connects us to the earth and provides unparalleled freshness. Don&apos;t be discouraged by setbacks; every season offers new lessons. Embrace the process, celebrate your harvests (big or small), and savor the delicious results of your hard work. Happy gardening!</p>
          </footer>
    </article>
    </>
  );
}
