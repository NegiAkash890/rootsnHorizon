import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'hero' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
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


