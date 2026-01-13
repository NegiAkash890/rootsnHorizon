import { defineField, defineType } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Homepage'
        }),
        defineField({
            name: 'navbar',
            title: 'Navbar Config',
            type: 'reference',
            to: [{ type: 'navbar' }]
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'heroSection'
        }),

        defineField({
            name: 'statsSection',
            title: 'Stats Section',
            type: 'statsSection'
        }),
        defineField({
            name: 'featuredStoriesSection',
            title: 'Featured Stories Section',
            type: 'featuredStoriesSection'
        }),
        defineField({
            name: 'aboutSection',
            title: 'About Section',
            type: 'aboutSection'
        }),
        defineField({
            name: 'teamSection',
            title: 'Team Section',
            type: 'teamSection'
        }),
        defineField({
            name: 'eventsSection',
            title: 'Events Section',
            type: 'eventsSection'
        }),
        defineField({
            name: 'getInvolvedSection',
            title: 'Get Involved Section',
            type: 'getInvolvedSection'
        }),
        defineField({
            name: 'gallerySection',
            title: 'Gallery Section',
            type: 'gallerySection'
        }),
        defineField({
            name: 'testimonialsSection',
            title: 'Testimonials Section',
            type: 'testimonialsSection'
        }),
        defineField({
            name: 'footer',
            title: 'Footer Config',
            type: 'reference',
            to: [{ type: 'footer' }]
        })
    ]
})
