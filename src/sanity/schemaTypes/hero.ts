import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string', initialValue: 'Main Hero' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'image', title: 'Background Image', type: 'image' }),
        defineField({
            name: 'cta',
            title: 'Call to Action',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'href', type: 'string' })
            ]
        })
    ]
})

export const heroSidebar = defineType({
    name: 'heroSidebar',
    title: 'Hero Sidebar (Yellow Box)',
    type: 'document',
    fields: [
        defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string', initialValue: 'Main Sidebar' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' })
    ]
})
