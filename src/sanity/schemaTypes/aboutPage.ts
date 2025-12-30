import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'The main title of the page (e.g. About Roots & Horizon)',
            initialValue: 'About Roots & Horizon'
        }),
        defineField({
            name: 'mainContent',
            title: 'Main Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The primary introduction text.'
        }),
        defineField({
            name: 'missionTitle',
            title: 'Mission Title',
            type: 'string',
            initialValue: 'Our Mission'
        }),
        defineField({
            name: 'missionDescription',
            title: 'Mission Description',
            type: 'text'
        }),
        defineField({
            name: 'visionTitle',
            title: 'Vision Title',
            type: 'string',
            initialValue: 'Our Vision'
        }),
        defineField({
            name: 'visionDescription',
            title: 'Vision Description',
            type: 'text'
        }),
        defineField({
            name: 'image',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true }
        })
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
})
