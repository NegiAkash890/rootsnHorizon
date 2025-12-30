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
                {
                    name: 'navLink',
                    title: 'Navigation Link',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', description: 'Link text. (e.g. "Our Mission")' },
                        {
                            name: 'targetSection',
                            title: 'Link to Homepage Section',
                            type: 'reference',
                            description: 'Select a homepage section to jump to. If the label above is empty, the section heading will be used.',
                            to: [
                                { type: 'heroSection' },
                                { type: 'statsSection' },
                                { type: 'aboutSection' },
                                { type: 'featuredStoriesSection' },
                                { type: 'getInvolvedSection' },
                                { type: 'contactSection' }
                            ]
                        },
                        { name: 'href', title: 'External/Static Link', type: 'string', description: 'Use this for external URLs or other pages (e.g. /news).' },
                        { name: 'anchorOverride', title: 'Manual Anchor', type: 'string', description: 'Manually specify an anchor (e.g. "contact-us") if not using a section reference.' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'mainLinks',
            title: 'Main Navigation Links',
            type: 'array',
            of: [
                {
                    name: 'navLink',
                    title: 'Navigation Link',
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', description: 'Link text. (e.g. "Our Mission")' },
                        {
                            name: 'targetSection',
                            title: 'Link to Homepage Section',
                            type: 'reference',
                            description: 'Select a homepage section to jump to. If the label above is empty, the section heading will be used.',
                            to: [
                                { type: 'heroSection' },
                                { type: 'statsSection' },
                                { type: 'aboutSection' },
                                { type: 'featuredStoriesSection' },
                                { type: 'getInvolvedSection' },
                                { type: 'contactSection' }
                            ]
                        },
                        { name: 'href', title: 'External/Static Link', type: 'string', description: 'Use this for external URLs or other pages (e.g. /news).' },
                        { name: 'anchorOverride', title: 'Manual Anchor', type: 'string', description: 'Manually specify an anchor (e.g. "contact-us") if not using a section reference.' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'cta',
            title: 'CTA Button',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'href', type: 'string' }),
                defineField({ name: 'anchor', type: 'string', title: 'Homepage Anchor' })
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
                {
                    name: 'footerSection',
                    type: 'object',
                    fields: [
                        { name: 'heading', type: 'string' },
                        {
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [
                                {
                                    name: 'footerLink',
                                    type: 'object',
                                    fields: [
                                        { name: 'label', type: 'string' },
                                        { name: 'href', type: 'string' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    ]
})
