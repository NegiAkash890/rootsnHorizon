import { type SchemaTypeDefinition } from 'sanity'
import { statsSection, story, featuredStoriesSection, getInvolvedCard, getInvolvedSection, aboutSection, contactSection } from './sections'
import { homepage } from './homepage'
import { heroSection } from './hero'
import { navbar, footer } from './layout'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        homepage,
        navbar,
        footer,
        heroSection,
        statsSection, // Now a document
        featuredStoriesSection, // Now a document
        getInvolvedSection, // Now a document
        aboutSection,
        contactSection,
        story,
        getInvolvedCard
    ],
}
