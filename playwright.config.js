import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    retries: 0,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        screenshot: 'on',
        video: 'on',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // ✅ Cookie store enable karo
                storageState: undefined
            },
        }
    ]
})