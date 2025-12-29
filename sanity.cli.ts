import { defineCliConfig } from 'sanity/cli'
import dotenv from 'dotenv'

// Load .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
    api: { projectId, dataset },
    vite: {
        define: {
            'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
            'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
            'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-29')
        }
    }
})
