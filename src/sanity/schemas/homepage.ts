import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'featuredCases',
      title: 'Featured Cases',
      type: 'array',
      description: 'Cases shown under "Featured work" on the frontpage, in this order. Leave empty to show the three newest.',
      of: [{ type: 'reference', to: [{ type: 'case' }] }],
      validation: (r) => r.unique(),
    }),
  ],
  preview: { select: { title: 'heroTitle', media: 'heroImage' } },
})
