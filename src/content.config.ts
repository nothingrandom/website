import { defineCollection , z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/collections/resume',
  }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.union([z.string(), z.date()]),
    endDate: z.union([z.string(), z.date()]),
    techStack: z.array(z.string()).optional(),
  })
});

export const collections = { experience };
