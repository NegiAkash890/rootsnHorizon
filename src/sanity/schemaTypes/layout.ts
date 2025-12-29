import { defineField, defineType } from 'sanity'

export const navbar = defineType({
    name: 'navbar',
    title: 'Navbar',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Main Navbar' }),
        defineField({
            name: 'topLinks',
            title: 'Top Bar Links',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string' }),
                        defineField({ name: 'href', type: 'string' })
                    ]
                })
            ]
        }),
        defineField({
            name: 'mainLinks',
            title: 'Main Navigation Links',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string' }),
                        defineField({ name: 'href', type: 'string' })
                    ]
                })
            ]
        }),
        defineField({
            name: 'cta',
            title: 'CTA Button',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'href', type: 'string' })
            ]
        })
    ]
})

export const footer = defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Main Footer' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
            name: 'sections',
            title: 'Link Sections',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    fields: [
                        defineField({ name: 'heading', type: 'string' }),
                        defineField({
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [
                                defineField({
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'label', type: 'string' }),
                                        defineField({ name: 'href', type: 'string' })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
})
