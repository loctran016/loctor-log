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
        tags:z.array(z.string()).default(['Lí thuyết']),
        icon: z.string().default('material-symbols-light:book-2'),
        category: z.enum(['bv','tbl','cls','lab']).optional()
      }),
    }),
  },
});
