// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const guidesDirectory = path.join(process.cwd(), 'content/guides');

// --- Define expected Frontmatter type ---
interface PostFrontmatter {
    title?: string; // Use optional (?) if some files might miss it
    description?: string; // Use optional (?)
    image?: string;
    pillarSlug?: string; // Usually only in cluster files
    // Add other fields you use, like date, author etc.
}

// Define the shape of data returned by getPostData
interface PostData extends PostFrontmatter {
    pillarSlug: string;
    clusterSlug: string | null;
    contentHtml: string;
}
// -----------------------------------------

// Add return type Promise<PostData | null>
export async function getPostData(pillarSlug: string, clusterSlug?: string): Promise<PostData | null> {
    const fileName = clusterSlug ? `${clusterSlug}.md` : 'index.md';
    const fullPath = path.join(guidesDirectory, pillarSlug, fileName);

    try {
        if (!fs.existsSync(fullPath)) { /* ... */ return null; }
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();

        // Assert the parsed frontmatter data conforms to your interface
        const frontmatter = matterResult.data as PostFrontmatter;

        return {
            pillarSlug,
            clusterSlug: clusterSlug || null,
            contentHtml,
            ...frontmatter, // Spread typed frontmatter
        };
    } catch { /* ... */ return null; }
}


// --- Define return type for Pillar Data ---
interface PillarData extends PostData {
    clusters: { slug: string; title?: string }[]; // Title might be missing if frontmatter issue
}
// -----------------------------------------

// Add return type Promise<PillarData | null>
export async function getPillarData(pillarSlug: string): Promise<PillarData | null> {
    const pillarContent = await getPostData(pillarSlug); // Type PostData | null
    if (!pillarContent) return null;

    const clusterSlugs = getAllClusterSlugsForPillar(pillarSlug);
    const clusters = await Promise.all(
        clusterSlugs.map(async ({ clusterSlug }) => {
            const clusterData = await getPostData(pillarSlug, clusterSlug);
            return {
                slug: clusterSlug,
                title: clusterData?.title, // Access optional title safely
            };
        })
    );

    // Filter out clusters where title might be missing, or handle differently
    const validClusters = clusters.filter(c => c.title) as { slug: string; title: string }[];

    return {
        ...pillarContent,
        clusters: validClusters,
    };
}

// --- Your other utility functions like getAllPillarSlugs etc. ---
// ...
export function getAllPillarSlugs(): { pillarSlug: string }[] { /* ... */ return []; }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getAllClusterSlugsForPillar(pillarSlug: string): { clusterSlug: string }[] { /* ... */ return []; }
export function getAllGuidePaths(): { params: { pillarSlug: string; clusterSlug: string } }[] { /* ... */ return []; }