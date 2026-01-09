import { defineField, defineType } from 'sanity'

export const statsSection = defineType({
    name: 'statsSection',
    title: 'Stats Section (Impact)',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'stats' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description Text',
            type: 'text',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    name: 'statItem',
                    title: 'Stat Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: { hotspot: true }
                        }),
                        defineField({
                            name: 'number',
                            title: 'Number/Stat',
                            type: 'string',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label/Description',
                            type: 'text'
                        })
                    ]
                }
            ]
        }),
    ],
})

export const story = defineType({
    name: 'story',
    title: 'News Story',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
        defineField({ name: 'image', title: 'Main Image', type: 'image' }),
        defineField({ name: 'tag', title: 'Tag', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'link', title: 'Link (External/Internal)', type: 'string' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
        defineField({
            name: 'content',
            title: 'Full Article Content',
            type: 'array',
            of: [{ type: 'block' }]
        }),
    ]
})

export const featuredStoriesSection = defineType({
    name: 'featuredStoriesSection',
    title: 'Featured Stories Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'featured-stories' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({
            name: 'mainFeature',
            title: 'Main Feature Story',
            type: 'reference',
            to: [{ type: 'story' }]
        }),
        defineField({
            name: 'subFeatures',
            title: 'Sub Features',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'story' }] }],
            validation: Rule => Rule.max(2)
        }),
        defineField({ name: 'seeAllText', title: 'See All Button Text', type: 'string' }),
        defineField({ name: 'seeAllLink', title: 'See All Link', type: 'string' })
    ]
})

export const getInvolvedCard = defineType({
    name: 'getInvolvedCard',
    title: 'Get Involved Card',
    type: 'object',
    fields: [
        defineField({ name: 'image', title: 'Image', type: 'image' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'date', title: 'Event Date', type: 'string', description: 'e.g., Oct 24, 2025' }),
        defineField({ name: 'time', title: 'Event Time', type: 'string', description: 'e.g., 10:00 AM' }),
        defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g., London, UK' }),
        defineField({ name: 'link', title: 'Link URL', type: 'string' }),
    ]
})

export const getInvolvedSection = defineType({
    name: 'getInvolvedSection',
    title: 'Get Involved Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'get-involved' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
            name: 'cards',
            title: 'Featured Events',
            description: 'Select events to display in this section. All events will be listed in the /events page.',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'event' }] }]
        })
    ]
})

export const aboutSection = defineType({
    name: 'aboutSection',
    title: 'About Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'about' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Brief Description', type: 'text' }),
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Button Link', type: 'string' }),
    ]
})

export const contactSection = defineType({
    name: 'contactSection',
    title: 'Contact Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'contact' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Get in Touch' }),
    ]
})

export const gallerySection = defineType({
    name: 'gallerySection',
    title: 'Gallery Section',
    type: 'object',
    fields: [
        defineField({ name: 'anchorId', title: 'Anchor ID', type: 'string', initialValue: 'gallery' }),
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Gallery' }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alternative Text',
                            type: 'string',
                        })
                    ]
                }
            ],
            options: {
                layout: 'grid'
            }
        })
    ]
})
