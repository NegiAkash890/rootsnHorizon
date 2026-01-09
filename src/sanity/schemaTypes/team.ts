
import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
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
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
})

export const teamSection = defineType({
    name: 'teamSection',
    title: 'Team Section',
    type: 'object',
    fields: [
        defineField({
            name: 'visible',
            title: 'Show Section',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle to show/hide this section on the visible page.'
        }),
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'Our Team',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'members',
            title: 'Team Members',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
        }),
    ],
})
