import { defineField, defineType } from 'sanity'

export const contactSubmission = defineType({
    name: 'contactSubmission',
    title: 'Contact Form Submissions',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            readOnly: true,
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Read', value: 'read' },
                    { title: 'Archived', value: 'archived' },
                ],
            },
            initialValue: 'new',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        },
    },
})
