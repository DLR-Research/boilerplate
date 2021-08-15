import test from './next-fixture'
import { expect } from '@playwright/test'

test('home displays title', async ({ page, port }) => {
  await page.goto(`http://localhost:${ port }/`)
  const title = await page.innerText('title')
  expect(title).toBe('DeSci · Home')
})

test('todo title input autofocuses on load', async ({ page, port }) => {
  await page.goto(`http://localhost:${ port }/todo`)
  const title_input_focused = await page.$eval('.TitleInput', el => el === document.activeElement)
  expect(title_input_focused).toBe(true)
})

test('todo can be added', async ({ page, port }) => {
  const test_title = 'TEST TITLE'
  await page.goto(`http://localhost:${ port }/todo`)
  await page.type('.TitleInput', test_title)
  await page.keyboard.press('Enter')
  const title = await page.innerText('.TodoItemTitle')
  expect(title).toBe(test_title)
})

