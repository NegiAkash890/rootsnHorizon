import { type SchemaTypeDefinition } from 'sanity'
import { statsSection, story, featuredStoriesSection, getInvolvedCard, getInvolvedSection, aboutSection, contactSection, gallerySection } from './sections'
import { homepage } from './homepage'
import { heroSection, heroSidebar } from './hero'
import { navbar, footer } from './layout'

import { contactSubmission } from './contactSubmission'
import { aboutPage } from './aboutPage'
import { teamMember, teamSection } from './team'
import { genericPage } from './genericPage'
import { event } from './event'
import { eventsSection } from './eventsSection'
import { testimonial } from './testimonial'
import { testimonialsSection } from './testimonialsSection'
import { teamPage } from './teamPage'

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
        aboutPage,
        teamMember,
        teamSection,
        genericPage,
        event,
        eventsSection,
        gallerySection,
        testimonial,
        testimonialsSection,
        teamPage
    ],
}
