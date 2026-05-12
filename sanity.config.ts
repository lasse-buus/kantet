'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  name: 'kantet',
  title: 'Kantet Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'nrloy6a0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['homepage'].includes(item.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
