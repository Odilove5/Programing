import { test, expect } from "@playwright/test";

test("canonical checkpoint is consistent across primary views",async({page})=>{
  await page.goto("/");
  await expect(page.getByRole("heading",{name:/Resume at range/})).toBeVisible();
  await expect(page.getByText("Lists",{exact:true})).toBeVisible();
  await page.goto("/current");
  await expect(page.getByText("range()",{exact:true}).first()).toBeVisible();
  await expect(page.getByText("Current",{exact:true})).toBeVisible();
  await page.goto("/curriculum");
  await expect(page.locator("#current-lesson")).toContainText("IN PROGRESS");
  await expect(page.getByText("6/6 complete")).toHaveCount(2);
});

test("a failed progress request keeps useful last-known content",async({page})=>{
  await page.route("**/api/state",route=>route.fulfill({status:503,body:"unavailable"}));
  await page.goto("/");
  await expect(page.getByText("Live progress unavailable")).toBeVisible();
  await expect(page.getByText("Last verified progress")).toBeVisible();
  await expect(page.getByRole("heading",{name:/Resume at range/})).toBeVisible();
  await expect(page.getByRole("button",{name:/Retry/})).toBeVisible();
});

test("mobile drawer exposes all navigation and restores focus",async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto("/");
  await expect(page.getByRole("heading",{name:/Resume at range/})).toBeVisible();
  const menu=page.locator(".menu-button");await expect(menu).toHaveAccessibleName("Open course navigation");await page.waitForTimeout(250);await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded","true");
  const nav=page.getByRole("navigation",{name:"Course navigation"});
  for(const name of ["Overview","Syllabus","Current Lesson","Skills","Projects","Capstone","History"])await expect(nav.getByRole("link",{name})).toBeVisible();
  await expect(nav.getByRole("link",{name:"Overview"})).toHaveAttribute("aria-current","page");
  await page.keyboard.press("Escape");await expect(menu).toBeFocused();
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth",390);
});
