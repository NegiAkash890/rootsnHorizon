import { defineField, defineType } from 'sanity'

export const eventsSection = defineType({
    name: 'eventsSection',
    title: 'Events Section Config',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'Upcoming Events'
        }),
        defineField({
            name: 'seeAllText',
            title: 'See All Button Text',
            type: 'string',
            initialValue: 'See The Latest'
        }),
    ],
})
