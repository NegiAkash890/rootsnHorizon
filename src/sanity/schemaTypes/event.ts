import { defineField, defineType } from 'sanity'

export const event = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'date',
            title: 'Date',
            type: 'datetime',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Upcoming', value: 'upcoming' },
                    { title: 'On-going', value: 'on-going' },
                    { title: 'Completed', value: 'completed' },
                ],
                layout: 'radio'
            },
            initialValue: 'upcoming'
        }),
        defineField({
            name: 'isFeatured',
            title: 'Feature on Homepage',
            type: 'boolean',
            initialValue: false,
            description: 'If checked, this event will appear in the "Scheduled Events" section on the homepage (limit 3).'
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'status',
            media: 'image',
        },
    },
})
