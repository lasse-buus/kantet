import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { list: ['Web Design', 'Development', 'Branding', 'UX/UI', 'E-commerce'] } }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used in the case list and as meta description (max 200 characters).',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Screenshots shown in a carousel below the case text. Click a photo to enlarge.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'url', title: 'Live URL', type: 'url' }),
  ],
  orderings: [
    { title: 'Year, newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  },
})
