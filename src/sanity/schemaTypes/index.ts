import { type SchemaTypeDefinition } from 'sanity'
import { statsSection, story, featuredStoriesSection, getInvolvedCard, getInvolvedSection, aboutSection, contactSection } from './sections'
import { homepage } from './homepage'
import { heroSection, heroSidebar } from './hero'
import { navbar, footer } from './layout'

import { contactSubmission } from './contactSubmission'
import { aboutPage } from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        homepage,
        navbar,
        footer,
        heroSection,
        heroSidebar, // Added
        statsSection,
        featuredStoriesSection,
        getInvolvedSection,
        aboutSection,
        contactSection,
        story,
        getInvolvedCard,
        contactSubmission,
        aboutPage
    ],
}
