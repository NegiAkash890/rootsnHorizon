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
            type: 'reference',
            to: [{ type: 'heroSection' }]
        }),
        defineField({
            name: 'heroSidebar',
            title: 'Hero Sidebar (Optional)',
            type: 'reference',
            to: [{ type: 'heroSidebar' }]
        }),
        defineField({
            name: 'statsSection',
            title: 'Stats Section',
            type: 'reference',
            to: [{ type: 'statsSection' }]
        }),
        defineField({
            name: 'featuredStoriesSection',
            title: 'Featured Stories Section',
            type: 'reference',
            to: [{ type: 'featuredStoriesSection' }]
        }),
        defineField({
            name: 'aboutSection',
            title: 'About Section',
            type: 'reference',
            to: [{ type: 'aboutSection' }]
        }),
        defineField({
            name: 'getInvolvedSection',
            title: 'Get Involved Section',
            type: 'reference',
            to: [{ type: 'getInvolvedSection' }]
        }),
        defineField({
            name: 'footer',
            title: 'Footer Config',
            type: 'reference',
            to: [{ type: 'footer' }]
        })
    ]
})
