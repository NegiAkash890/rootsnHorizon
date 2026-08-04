
import { defineField, defineType } from 'sanity'

export const genericPage = defineType({
    name: 'genericPage',
    title: 'Generic Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ]
        }),
        defineField({ name: 'seo', title: 'SEO & Social Overrides', type: 'seo' }),
    ],
})
