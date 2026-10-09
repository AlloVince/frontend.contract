import {test,expect} from '@playwright/test';
test('深度链接、刷新、浏览器历史记录和 404 页面',async({page})=>{
 await page.goto('/items');
 await expect(page.getByRole('heading',{name:'列表'})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('heading',{name:'列表'})).toBeVisible();
 await page.getByRole('link',{name:'返回首页'}).click();
 await expect(page).toHaveURL('/');
 await page.goBack();
 await expect(page).toHaveURL('/items');
 await page.goto('/missing');
 await expect(page.getByRole('heading',{name:'页面不存在'})).toBeVisible();
});
