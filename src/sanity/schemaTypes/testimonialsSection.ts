import { defineField, defineType } from 'sanity'

export const testimonialsSection = defineType({
    name: 'testimonialsSection',
    title: 'Testimonials Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Section Heading',
            type: 'string',
            initialValue: 'What People Say'
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
        })
    ]
})
