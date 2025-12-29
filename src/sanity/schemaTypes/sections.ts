import { defineField, defineType } from 'sanity'

export const statsSection = defineType({
    name: 'statsSection',
    title: 'Stats Section (Impact)',
    type: 'document', // Promoted to document
    fields: [
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
                defineType({
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
                })
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
    ]
})

export const featuredStoriesSection = defineType({
    name: 'featuredStoriesSection',
    title: 'Featured Stories Section',
    type: 'document', // Promoted to document
    fields: [
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
        defineField({ name: 'link', title: 'Link URL', type: 'string' }),
    ]
})

export const getInvolvedSection = defineType({
    name: 'getInvolvedSection',
    title: 'Get Involved Section',
    type: 'document', // Promoted to document
    fields: [
        defineField({ name: 'title', title: 'Internal Title', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of: [{ type: 'getInvolvedCard' }]
        })
    ]
})
