import { test, expect } from '@playwright/test'

test.describe('Auth Flow', () => {

    test('Register', async ({ page }) => {
        await page.goto('/register')
        await page.fill('input[name="username"]', 'e2etestuser')
        await page.fill('input[name="email"]', 'e2etest@gmail.com')
        await page.fill('input[name="password"]', 'test1234')
        await page.click('button.primary-button')
        await page.waitForTimeout(3000)
        expect(page.url()).toContain('localhost:5173')
    })

    test('Login', async ({ page }) => {
        await page.goto('/login')
        await page.fill('input[name="email"]', 'e2etest@gmail.com')
        await page.fill('input[name="password"]', 'test1234')
        await page.click('button.primary-button')
        await page.waitForTimeout(3000)
        expect(page.url()).toContain('localhost:5173')
    })

    test('Protected Route - Redirect to Login', async ({ page }) => {
        await page.goto('/')
        await page.waitForTimeout(2000)
        expect(page.url()).toContain('login')
    })

    test('Protected Route - After Login', async ({ page }) => {
        await page.goto('/login')
        await page.fill('input[name="email"]', 'e2etest@gmail.com')
        await page.fill('input[name="password"]', 'test1234')
        await page.click('button.primary-button')
        await page.waitForTimeout(3000)
        await expect(page.locator('.home-page')).toBeVisible({ timeout: 10000 })
    })

    test('Logout', async ({ page }) => {
        await page.goto('/login')
        await page.fill('input[name="email"]', 'e2etest@gmail.com')
        await page.fill('input[name="password"]', 'test1234')
        await page.click('button.primary-button')
        await page.waitForTimeout(3000)
        await page.click('button.logout-btn')
        await page.waitForTimeout(2000)
        expect(page.url()).toContain('login')
    })
})