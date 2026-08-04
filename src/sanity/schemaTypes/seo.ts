import { defineField, defineType } from 'sanity'

export const seo = defineType({
    name: 'seo',
    title: 'SEO & Social Media Overrides',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Custom search engine title (default uses document title if blank).',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'Custom search engine summary snippet.',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'ogImage',
            title: 'Social Sharing Image (OG Image)',
            type: 'image',
            options: { hotspot: true },
            description: 'Custom image for social media previews (LinkedIn, Twitter, WhatsApp).',
        }),
        defineField({
            name: 'noIndex',
            title: 'Hide from Search Engines (noindex)',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
