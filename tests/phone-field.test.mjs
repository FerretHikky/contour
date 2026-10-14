import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizePhoneInput,phoneDisplay,phoneDetails,phoneMask,caretAfterDigits,phoneNationalDisplay} from '../design/design-system/adapters/react/dist/phone.js';
test('national and international paste normalize to the same E164 value',()=>{
 assert.equal(normalizePhoneInput('555 12 34 56','GE'),'+995555123456');
 assert.equal(normalizePhoneInput('+995 (555) 12-34-56','US'),'+995555123456');
 assert.equal(normalizePhoneInput('0044 7700 900123','GE'),'+447700900123');
 assert.equal(normalizePhoneInput('07700 900123','GB'),'+447700900123');
 assert.equal(normalizePhoneInput('２０２５５５０１２３','US'),'+12025550123');
});
test('country-specific display and masks preserve actual calling code',()=>{
 assert.equal(phoneDisplay('+995555123456'),'+995 555 12 34 56');
 assert.equal(phoneDisplay('+12025550123'),'+1 202 555 0123');
 assert.equal(phoneMask('GE'),'+995 000 00 00 00');
 assert.notEqual(phoneMask('GB'),phoneMask('GE'));
});
test('partial, overlong and disallowed-country values stay invalid',()=>{
 for(const value of ['','+','+9955','+99555512345678901','+12025550123'])assert.equal(phoneDetails(value,'GE',['GE']).valid,false);
 assert.equal(phoneDetails('+995555123456','GE',['GE']).valid,true);
 assert.equal(phoneDetails('+12025550123','GE',['US','GE']).country,'US');
 assert.equal(phoneDetails('+447700900123','US',['US','GB']).country,'GB');
});
test('caret maps digit positions across separators',()=>{
 assert.equal(caretAfterDigits('+995 555 12 34 56',4),6);
 assert.equal(caretAfterDigits('+995 555 12 34 56',12),17);
});

test('national input keeps calling code outside editable text',()=>{
 assert.equal(phoneNationalDisplay('+995555123456','GE'),'555 12 34 56');
 assert.equal(phoneNationalDisplay('+12025550123','US'),'202 555 0123');
 assert.equal(phoneNationalDisplay('+995','GE'),'');
 assert.equal(normalizePhoneInput('555 12 34 56','GE'),'+995555123456');
});
