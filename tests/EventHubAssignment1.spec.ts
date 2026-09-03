import { test, expect, Page } from '@playwright/test'

test('Booking Flow', async ({ page }) => {

    const url = 'https://eventhub.rahulshettyacademy.com';
    const emailID = 'eventhub.sctest@gmail.com';
    const pwdVal = 'mSPM8H3rDRmUpr@';

    await loginFunction(page, url, emailID, pwdVal);

    await page.goto(url + '/admin/events');
    await page.locator('div.p-6 h2').waitFor();

    expect(await page.locator('div.p-6 h2')).toContainText('+ New Event')
    const eventName = `SC_EVENT_${Date.now()}`;

    await page.locator('input#event-title-input').fill(eventName);
    await page.locator('#admin-event-form textarea').fill('This is the best event of all time.');
    await page.getByLabel('city').fill('Kolkata');
    await page.getByLabel('venue').fill('This is the best event');

    const valueDate = await futureDateTimeValue();
    await page.getByLabel('Event Date & Time').fill(valueDate);

    await page.locator('#price-\\(\\$\\)').fill('125');
    await page.getByLabel('Total Seats').fill('120');

    await page.locator('button#add-event-btn').click();
    await page.locator('.flex-1').waitFor();

    expect(await page.locator('.flex-1')).toBeVisible();

    await page.goto(url + '/events');
    await page.locator("[data-testid='event-card']").first().waitFor();

    expect(await page.locator("[data-testid='event-card']").filter({ hasText: eventName })).toBeVisible({ timeout: 500 });

    const seatElement = page
        .locator("[data-testid='event-card']")
        .filter({ hasText: eventName })
        .locator('div.justify-between div span')
        .first();

    const rawText = await seatElement.textContent();
    const seatsBeforeBooking: string = rawText ? rawText.split(" ")[0] : "0";



    expect(await page.getByText(eventName).isVisible()).toBeTruthy()
    expect(await page.locator('#ticket-count').textContent()).toBe('1');

    await page.getByLabel('Full Name').fill('Jayjit Sahani');
    await page.locator('input#customer-email').fill("Jaijit@hotmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("+91 78654 43211");
    await page.locator('.confirm-booking-btn').click();
    await page.locator('.booking-ref').waitFor()

    expect(await page.locator('.booking-ref').isVisible()).toBeTruthy();
    const bookingRef = (await page.locator('.booking-ref').innerText()).trim();

    await page.getByRole('button', { name: 'View My Bookings' }).click()
    await page.locator('#booking-card').first().waitFor()

    const currrentURL = page.url();
    expect(currrentURL).toBe(url + '/bookings');
    expect(await page.locator('#booking-card').first().isVisible()).toBeTruthy()
    expect(await page.locator('#booking-card .booking-ref').filter({ hasText: bookingRef }).isVisible()).toBeTruthy()
    expect(await page.locator('#booking-card h3').filter({ hasText: eventName }).isVisible()).toBeTruthy()

    await page.goto(url + '/events');
    await page.locator("[data-testid='event-card']").first().waitFor();
    expect(await page.locator("[data-testid='event-card']").filter({ hasText: eventName })).toBeVisible({ timeout: 500 })

    const seatLocator = page
        .locator("[data-testid='event-card']")
        .filter({ hasText: eventName })
        .locator('div.justify-between div span')
        .first()


    await expect(seatLocator).toContainText(`${Number(seatsBeforeBooking) - 1}`);

})

test('Single ticket booking is eligible for refund', async ({ page }) => {

    const url = 'https://eventhub.rahulshettyacademy.com';
    const emailID = 'eventhub.sctest@gmail.com';
    const pwdVal = 'mSPM8H3rDRmUpr@';

    await loginFunction(page, url, emailID, pwdVal);
    await page.goto(url + '/events');
    await page.locator("[data-testid='event-card']").first().waitFor();
    await page.locator("[data-testid='event-card']").first().locator('[data-testid="book-now-btn"]').click();

    await page.getByLabel('Full Name').fill('Jayjit Sahani');
    await page.locator('input#customer-email').fill("Jaijit@hotmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("+91 78654 43211");
    await page.locator('.confirm-booking-btn').click();
    await page.locator('.booking-ref').waitFor()

    expect(await page.locator('.booking-ref').isVisible()).toBeTruthy();

    await page.getByRole('button', { name: 'View My Bookings' }).click()
    await page.locator('#booking-card').first().waitFor()
    const currrentURL = page.url();
    expect(currrentURL).toBe(url + '/bookings');
    expect((await page.locator('#booking-card').first()).isVisible()).toBeTruthy()

    await (page.locator('div#booking-card').first()).locator('div.border-t a').click();

    await page.locator('h1.font-bold').waitFor();


    const rawBookingRef = await page.locator('span.bg-indigo-50').first().textContent();
    const bookingRef = rawBookingRef ? rawBookingRef.split('')[0] : "";

    const rawEventTitle = await page.locator('h3.text-base').first().textContent();
    const eventTitle = rawEventTitle ? rawEventTitle.split('')[0] : "";

    expect(bookingRef).toBe(eventTitle);

    await page.locator('button#check-refund-btn').click();

    expect(await page.locator('#refund-spinner').isVisible()).toBeTruthy();
    await page.locator('#refund-spinner').waitFor({ state: 'hidden', timeout: 7000 });

    expect(await page.locator('#refund-result')).toBeVisible();
    expect(await page.locator('#refund-result')).toContainText('Eligible for refund.')
    expect(await page.locator('#refund-result')).toContainText('Single-ticket bookings qualify for a full refund.')
})

test('Group ticket booking is NOT eligible for refund', async ({ page }) => {

    const url = 'https://eventhub.rahulshettyacademy.com';
    const emailID = 'eventhub.sctest@gmail.com';
    const pwdVal = 'mSPM8H3rDRmUpr@';

    await loginFunction(page, url, emailID, pwdVal);
    await page.goto(url + '/events');
    await page.locator("[data-testid='event-card']").first().waitFor();
    await page.locator("[data-testid='event-card']").first().locator('[data-testid="book-now-btn"]').click();

    await page.getByRole("button", { name: '+' }).dblclick();
    expect(await page.locator('#ticket-count').textContent()).toBe('3');

    await page.getByLabel('Full Name').fill('Jayjit Sahani');
    await page.locator('input#customer-email').fill("Jaijit@hotmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("+91 78654 43211");
    await page.locator('.confirm-booking-btn').click();
    await page.locator('.booking-ref').waitFor()

    expect(await page.locator('.booking-ref').isVisible()).toBeTruthy();

    await page.getByRole('button', { name: 'View My Bookings' }).click()
    await page.locator('#booking-card').first().waitFor()
    const currrentURL = page.url();
    expect(currrentURL).toBe(url + '/bookings');
    expect((await page.locator('#booking-card').first()).isVisible()).toBeTruthy()

    await (page.locator('div#booking-card').first()).locator('div.border-t a').click();

    await page.locator('h1.font-bold').waitFor();


    const rawBookingRef = await page.locator('span.bg-indigo-50').first().textContent();
    const bookingRef = rawBookingRef ? rawBookingRef.split('')[0] : "";

    const rawEventTitle = await page.locator('h3.text-base').first().textContent();
    const eventTitle = rawEventTitle ? rawEventTitle.split('')[0] : "";

    expect(bookingRef).toBe(eventTitle);

    await page.locator('button#check-refund-btn').click();

    expect(await page.locator('#refund-spinner').isVisible()).toBeTruthy();
    await page.locator('#refund-spinner').waitFor({ state: 'hidden', timeout: 7000 });

    expect(await page.locator('#refund-result')).toBeVisible();
    expect(await page.locator('#refund-result')).toContainText('Not eligible for refund')
    expect(await page.locator('#refund-result')).toContainText('Group bookings (3 tickets) are non-refundable')



})



async function loginFunction(page: Page, url: string, eMail: string, pwd: string) {
    await page.goto(url)
    await page.getByPlaceholder('you@email.com').fill(eMail);
    await page.getByPlaceholder('••••••').fill(pwd);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('div.justify-between h2').waitFor();
    expect(await page.getByText('Browse Events →')).toBeVisible()
}

function futureDateTimeValue(daysAhead = 7, timeString = "12:00") {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);

    // Splits '2026-05-25T21:50:48.000Z' into '2026-05-25'
    const datePart = date.toISOString().split('T')[0];

    // Combines them into '2026-05-25T12:00'
    return `${datePart}T${timeString}`;
}