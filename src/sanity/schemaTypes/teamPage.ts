
import { defineField, defineType } from 'sanity'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Team Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Our Team',
        }),
        defineField({
            name: 'description',
            title: 'Page Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'sections',
            title: 'Team Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'teamSectionItem',
                    title: 'Team Section',
                    fields: [
                        defineField({
                            name: 'heading',
                            title: 'Section Heading',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'members',
                            title: 'Members',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Team Member',
                                    fields: [
                                        defineField({
                                            name: 'name',
                                            title: 'Name',
                                            type: 'string',
                                            validation: Rule => Rule.required(),
                                        }),
                                        defineField({
                                            name: 'role',
                                            title: 'Role',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'image',
                                            title: 'Image',
                                            type: 'image',
                                            options: { hotspot: true },
                                            validation: Rule => Rule.required(),
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            title: 'name',
                                            subtitle: 'role',
                                            media: 'image',
                                        },
                                    },
                                }
                            ]
                        })
                    ],
                    preview: {
                        select: {
                            title: 'heading',
                            members: 'members',
                        },
                        prepare({ title, members }) {
                            return {
                                title,
                                subtitle: `${members ? members.length : 0} members`,
                            }
                        },
                    },
                }
            ]
        })
    ]
})
