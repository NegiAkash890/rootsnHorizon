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
                            S.listItem()
                                .title('Team Page')
                                .child(S.document().schemaType('teamPage').documentId('teamPage')),
                            // Future pages can be added here
                        ])
                ),

            S.divider(),

            // 5. Advanced / Page Components
            // Grouping these keeps the root clean, but allows advanced editing of specific section documents
            S.listItem()
                .title('Home Page Sections')
                .child(
                    S.list()
                        .title('Section List')
                        .items([
                            S.documentTypeListItem('heroSection').title('Hero Section'),
                            S.documentTypeListItem('aboutSection').title('About Section'),
                            S.documentTypeListItem('statsSection').title('The Impact We Are Creating'),
                            S.documentTypeListItem('featuredStoriesSection').title('News & Featured Stories'),
                            S.documentTypeListItem('getInvolvedSection').title('Upcoming Events'),
                        ])
                ),
        ])
