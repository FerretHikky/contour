import {build} from 'esbuild';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const path='design/design-system/web/phone-field.js';
const result=await build({entryPoints:['design/design-system/adapters/react/src/PhoneField.tsx'],bundle:true,format:'esm',platform:'browser',target:'es2022',external:['react','react/jsx-runtime'],write:false,legalComments:'inline',banner:{js:'/* Generated Contour PhoneField. Do not edit. */'}});
if(process.argv.includes('--check')){if(await readFile(path,'utf8')!==result.outputFiles[0].text)throw Error('Stale PhoneField bundle');}
else {await writeFile(path,result.outputFiles[0].text);await mkdir('design/design-system/web/licenses',{recursive:true});await copyFile('node_modules/libphonenumber-js/LICENSE','design/design-system/web/licenses/libphonenumber-js.txt');await copyFile('node_modules/libphonenumber-js/LICENSE.Apache','design/design-system/web/licenses/libphonenumber-metadata.txt');await copyFile('node_modules/country-flag-icons/LICENSE','design/design-system/web/licenses/country-flag-icons.txt');}

const cssPath='design/design-system/web/phone-field.css';
const css='/* Generated from web/components/phone-field.css. Do not edit. */\n'+await readFile('design/design-system/web/components/phone-field.css','utf8');
if(process.argv.includes('--check')){if(await readFile(cssPath,'utf8')!==css)throw Error('Stale PhoneField styles');}else await writeFile(cssPath,css);
