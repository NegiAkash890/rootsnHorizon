import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'role',
            title: 'Role / Title',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Author Image',
            type: 'image',
            options: { hotspot: true }
        }),
    ],
    preview: {
        select: {
            title: 'author',
            subtitle: 'role',
            media: 'image'
        }
    }
})
