const { test, expect } = require('@playwright/test')


const SIX_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
        { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
        { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

test.describe("Assignmemt for mock", async () => {


    test("Banner IS visible when 6 events are returned", async ({ page }) => {

        page.route('**/api/events**', route => route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(SIX_EVENTS_RESPONSE),
        }))

        const url = 'https://eventhub.rahulshettyacademy.com';
        const emailID = 'eventhub.sctest123@gmail.com';
        const pwdVal = 'mSPM8H3rDRmUpr@';

        await loginFunction(page, url, emailID, pwdVal);

        const cards = await page.locator("[data-testid='event-card']");
        expect(await cards.first()).toBeVisible();
        expect(await cards.count()).toBe(6);

        await page.locator("a:has-text('View all →')").click()
        expect(await page.getByText(/sandbox holds up to/)).toBeVisible()
        expect(await page.getByText(/sandbox holds up to/)).toContainText("9 bookings")

    })

    test("Banner is NOT visible when 4 events are returned", async ({ page }) => {

        page.route('**/api/events**', route => route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(FOUR_EVENTS_RESPONSE),
        }))

        const url = 'https://eventhub.rahulshettyacademy.com';
        const emailID = 'eventhub.sctest123@gmail.com';
        const pwdVal = 'mSPM8H3rDRmUpr@';

        await loginFunction(page, url, emailID, pwdVal);

        const cards = await page.locator("[data-testid='event-card']");
        expect(await cards.first()).toBeVisible();
        expect(await cards.count()).toBe(4);

        await page.locator("a:has-text('View all →')").click()
        expect(await page.getByText(/sandbox holds up to/)).not.toBeVisible()

    })
})

async function loginFunction(page, url, eMail, pwd) {
    await page.goto(url)
    await page.getByPlaceholder('you@email.com').fill(eMail);
    await page.getByPlaceholder('••••••').fill(pwd);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('div.justify-between h2').waitFor();
    expect(await page.getByText('Browse Events →')).toBeVisible()
}

