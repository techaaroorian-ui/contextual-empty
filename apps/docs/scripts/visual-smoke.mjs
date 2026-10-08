import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const url=process.env.AAR_LAB_URL || 'http://127.0.0.1:5180';
const artifacts=new URL('../visual-artifacts/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:new URL(url).origin});
 await page.goto(url+'/#/');
 const header=page.locator('.aar-site-header');
 const appearance=header.getByLabel('Appearance',{exact:true});
 const accent=header.getByLabel('Accent',{exact:true});
 assert.deepEqual(await appearance.locator('option').evaluateAll(options=>options.map(option=>option.value)),['light','dark','system']);
 assert.deepEqual(await accent.locator('option').evaluateAll(options=>options.map(option=>option.value)),['default','custom']);
 await appearance.selectOption('light');
 const light=await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim());
 await appearance.selectOption('dark');
 assert.notEqual(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await appearance.selectOption('system');await page.emulateMedia({colorScheme:'light'});
 assert.equal(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await page.emulateMedia({colorScheme:'dark'});
 assert.notEqual(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await accent.selectOption('custom');
 await header.getByLabel('Primary',{exact:true}).fill('#326954');
 assert.equal(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-primary').trim()),'#326954');
 await accent.selectOption('default');
 await header.getByRole('button',{name:'Magic Art',exact:true}).click();
 assert.equal(await page.locator('.aar-site').getAttribute('data-magic-art'),'true');
 await header.getByRole('button',{name:'Magic Art',exact:true}).click();
 await appearance.focus();await appearance.press('Home');await appearance.press('Enter');
 assert.equal(await appearance.inputValue(),'light');

 for(const route of ['','aar-loom','headless','contextual-empty','guides/philosophy','guides/magic-art','guides/icons','guides/versioning']) {
  await page.goto(url+'/#/'+route);
  for(const width of [320,768,1440]) {await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);}
 }
 await page.goto(url+'/#/aar-loom');
 await page.getByRole('button',{name:'Layout primitives',exact:false}).click();
 await page.getByRole('heading',{name:'Layouts without framework components'}).waitFor();
 await page.setViewportSize({width:320,height:1000});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Layout guide at 320');
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:new URL('framework-layouts.png',artifacts).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 await page.goto(url+'/#/headless');
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'Ordered Collection',exact:false}).click();
 await page.locator('[aria-label="Collection items"]').getByRole('button',{name:'Details'}).click();
 assert.equal(await page.getByRole('button',{name:'Details',exact:true}).getAttribute('aria-pressed'),'true');
 const code=page.locator('.aar-code').filter({has:page.getByRole('button',{name:'Copy OrderedCollectionExample.tsx'})});
 const source=(await readFile(new URL('../src/OrderedCollectionExample.tsx',import.meta.url),'utf8')).replace(/\r\n/g,'\n').trimEnd();
 assert.equal(await code.locator('pre code').textContent(),source);
 assert.ok(await code.locator('.hljs-keyword').count()>0);
 await code.getByRole('button',{name:'Copy OrderedCollectionExample.tsx'}).click();
 assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),source);
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'File Intake',exact:false}).click();
 await page.getByLabel('Image files').setInputFiles({name:'cover.png',mimeType:'image/png',buffer:Buffer.from('example')});
 assert.match(await page.locator('#intake-result').textContent(),/Accepted 1 file/);
 await page.getByLabel('Image files').setInputFiles({name:'large.png',mimeType:'image/png',buffer:Buffer.alloc(2*1024*1024+1)});
 assert.match(await page.locator('#intake-result').textContent(),/exceeds/);
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('.aar-button').first().evaluate(el=>getComputedStyle(el).animationName),'none');
 assert.deepEqual(errors,[]);

 // A consumer fixture using HTML and public CSS alone: no React or other components.
 const files=['tokens','components','layouts','compositions','expression','code','magic-art','utilities'];
 const css=(await Promise.all(files.map(name=>readFile(new URL('../../../packages/aar-loom/src/'+name+'.css',import.meta.url),'utf8')))).join('\n');
 await page.setContent(`<style>${css}</style><body class="aar-page-reset"><main class="aar-root" data-theme="light"><section class="aar-container aar-stack aar-p-4" data-gap="6"><h1 class="aar-title">Independent HTML</h1><div class="aar-grid" data-min="18"><article class="aar-panel">Main work</article><aside class="aar-panel">Supporting tools</aside></div><label class="aar-field">Choice<span class="aar-select-frame"><select class="aar-select"><option>First</option><option>Second</option></select></span></label></section></main></body>`);
 await page.getByRole('combobox').selectOption({label:'Second'});
 for(const width of [320,1280]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Plain HTML fixture');}
 console.log('Visual smoke passed: framework-only HTML, simplified themes, native keyboard selection, custom accent, all routes and narrow layouts, copyable source, file validation, reduced motion.');
} finally {await browser.close();}
