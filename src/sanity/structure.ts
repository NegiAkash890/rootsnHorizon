import type { StructureBuilder } from 'sanity/structure'

// We define a cleaner structure for the Desk (CMS Sidebar)
export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Website Management')
        .items([
            // 1. Site Configuration (Global)
            S.listItem()
                .title('Global Settings')
                .child(
                    S.list()
                        .title('Global Settings')
                        .items([
                            S.listItem()
                                .title('Navbar')
                                .child(S.document().schemaType('navbar').documentId('navbar')),
                            S.listItem()
                                .title('Footer')
                                .child(S.document().schemaType('footer').documentId('footer')),
                        ])
                ),

            S.divider(),

            // 2. Pages (The main entry point for editing pages)
            S.listItem()
                .title('Pages')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Homepage')
                                .child(S.document().schemaType('homepage').documentId('homepage')),
                            S.listItem()
                                .title('About Page')
                                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                            // Future pages can be added here
                        ])
                ),

            S.divider(),

            // 3. Content Library (Reusable Data)
            S.listItem()
                .title('Content Library')
                .child(
                    S.list()
                        .title('Content Library')
                        .items([
                            S.documentTypeListItem('story').title('Stories & Articles'),
                            // Add other reusable content types here (e.g. Testimonials, Team Members)
                        ])
                ),

            S.divider(),

            // 4. Data Submissions
            S.listItem()
                .title('Inbound Data')
                .child(
                    S.list()
                        .title('Submissions')
                        .items([
                            S.documentTypeListItem('contactSubmission').title('Contact Form Submissions'),
                        ])
                ),

            S.divider(),

            // 5. Advanced / Page Components
            // Grouping these keeps the root clean, but allows advanced editing of specific section documents
            S.listItem()
                .title('Component Library (Advanced)')
                .child(
                    S.list()
                        .title('Page Components')
                        .items([
                            S.documentTypeListItem('heroSection').title('Hero Sections'),
                            S.documentTypeListItem('heroSidebar').title('Hero Sidebars'),
                            S.documentTypeListItem('statsSection').title('Stats Sections'),
                            S.documentTypeListItem('aboutSection').title('About Sections'),
                            S.documentTypeListItem('featuredStoriesSection').title('Featured Stories Sections'),
                            S.documentTypeListItem('getInvolvedSection').title('Get Involved Sections'),
                            S.documentTypeListItem('contactSection').title('Contact Sections'),
                        ])
                ),
        ])
