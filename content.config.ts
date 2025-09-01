import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.{md,yml}",
      schema: z.object({
        date: z.string(),
        title: z.string(),
        draft: z.boolean().default(false),
        tags:z.array(z.string()).default([]),
        icon: z.string().default('material-symbols-light:book-2')
      }),
    }),
    json: defineCollection({
      type: "data",
      source: "**/*.json",
      schema:z.object({
          data: z.record(z.string(), z.object({
              name: z.string(),
              color: z.enum(['black','red', 'blue', 'green', 'purple', 'pink', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'teal', 'cyan', 'sky', 'indigo', 'violet', 'fuchsia', 'rose']),
              startDate: z.string().optional(),
              endDate: z.string().optional(),
        }))
      })
    }),
  },
});
