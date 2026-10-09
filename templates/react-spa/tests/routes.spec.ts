import {test,expect} from '@playwright/test';
test('deep links, refresh, history and 404',async({page})=>{
 await page.goto('/items');
 await expect(page.getByRole('heading',{name:'Items'})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('heading',{name:'Items'})).toBeVisible();
 await page.getByRole('link',{name:'Home'}).click();
 await expect(page).toHaveURL('/');
 await page.goBack();
 await expect(page).toHaveURL('/items');
 await page.goto('/missing');
 await expect(page.getByRole('heading',{name:'Not found'})).toBeVisible();
});
