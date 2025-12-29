import type { StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // Singleton Homepage
            S.listItem()
                .title('Homepage')
                .child(
                    S.document()
                        .schemaType('homepage')
                        .documentId('homepage')
                ),
            // Other documents
            S.documentTypeListItem('story').title('Stories'),
        ])
