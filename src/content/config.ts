/**
 * Content collections — the schema that protects the site from broken posts.
 *
 * Each collection defines the *shape* of the markdown frontmatter that members
 * of the team must fill in. If a required field is missing, or has the wrong
 * type, the build fails with a readable error pointing at the file. This means
 * the team can author content freely without ever breaking production.
 *
 * To add a new collection, define it below and add it to `collections`.
 */
import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      excerpt: z.string().max(280),
      tags: z.array(z.string()).default([]),
      author: z.string().default('Extended Matrix team'),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      period: z.string(), // e.g. "2018–2021"
      partners: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      location: z.string().optional(),
      summary: z.string().max(280),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

const team = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      affiliation: z.string(),
      bio: z.string().optional(),
      avatar: image().optional(),
      orcid: z.string().optional(),
      email: z.string().email().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { news, projects, team };
