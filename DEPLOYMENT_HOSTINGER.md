# Deploying Roots & Horizon to Hostinger

Since your Sanity Studio is now embedded within your Next.js application at `/studio`, you only need to deploy **one application** (the Next.js app). This simplifies the process significantly.

## Prerequisites

1.  **Git Repository**: Ensure your code is pushed to a Git provider (GitHub, GitLab, or Bitbucket).
2.  **Environment Variables**: You will need your Sanity project details.

## Option 1: Hostinger VPS (Recommended for Flexibility)

If you are using a VPS (Ubuntu/Debian):

1.  **Connect to VPS**:
    ```bash
    ssh root@your_vps_ip
    ```

2.  **Install Node.js & PM2**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo npm install -g pm2
    ```

3.  **Clone Your Repository**:
    ```bash
    git clone <your_repo_url>
    cd rootsnHorizon
    ```

4.  **Install Dependencies**:
    ```bash
    npm install
    ```

5.  **Setup Environment Variables**:
    Create a `.env` file or export variables.
    ```bash
    nano .env
    ```
    Add:
    ```
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    NEXT_PUBLIC_SANITY_API_VERSION=2024-12-29
    ```

6.  **Build**:
    ```bash
    npm run build
    ```

7.  **Start with PM2**:
    ```bash
    pm2 start npm --name "rootsnhorizon" -- start
    pm2 save
    pm2 startup
    ```

## Option 2: Hostinger Web Hosting (Cloud/Business Shared)

Hostinger's shared/cloud plans have "Node.js" support.

1.  **Access hPanel**: Go to **Websites** > **Manage**.
2.  **Node.js App**: Find the **Node.js** section.
3.  **Create Application**:
    *   **Application Root**: `public_html/rootsnhorizon` (or wherever you upload).
    *   **Startup File**: `node_modules/.bin/next` (or create a custom `server.js`).
    *   *Note: Next.js on shared hosting can be tricky. It is often easier to use the VPS method or deploy to Vercel/Netlify if possible.*

## Verification

After deployment:
- **Website**: `http://your-domain.com`
- **Studio**: `http://your-domain.com/studio`

2f/KcXOL.WhhCVk19wBZ