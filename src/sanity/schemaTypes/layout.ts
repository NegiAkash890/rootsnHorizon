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
                            type: 'string',
                            description: 'Select a homepage section to jump to.',
                            options: {
                                list: [
                                    { title: 'Hero', value: 'hero' },
                                    { title: 'Stats', value: 'stats' },
                                    { title: 'About', value: 'about' },
                                    { title: 'Featured Stories', value: 'featured-stories' },
                                    { title: 'Get Involved', value: 'get-involved' },
                                    { title: 'Contact', value: 'contact' },
                                    { title: 'Gallery', value: 'gallery' }
                                ]
                            }
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
                            type: 'string',
                            description: 'Select a homepage section to jump to.',
                            options: {
                                list: [
                                    { title: 'Hero', value: 'hero' },
                                    { title: 'Stats', value: 'stats' },
                                    { title: 'About', value: 'about' },
                                    { title: 'Featured Stories', value: 'featured-stories' },
                                    { title: 'Get Involved', value: 'get-involved' },
                                    { title: 'Contact', value: 'contact' },
                                    { title: 'Gallery', value: 'gallery' }
                                ]
                            }
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
                                        { name: 'href', type: 'string', description: 'External or manual link' },
                                        {
                                            name: 'targetPage',
                                            title: 'Target Page',
                                            type: 'reference',
                                            to: [{ type: 'genericPage' }],
                                            description: 'Select a page to link to'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'LinkedIn', value: 'linkedin' }
                                ]
                            }
                        },
                        { name: 'url', title: 'URL', type: 'string' }
                    ]
                }
            ]
        })
    ]
})
