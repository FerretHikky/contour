import {useState} from 'react';
import {PhoneField} from '../src/index.js';
export function PhoneFieldExample(){const [phone,setPhone]=useState('');return <PhoneField id="example-phone" label="Phone number" countryLabel="Country" clearLabel="Clear phone number" invalidMessage="Enter a complete phone number" defaultCountry="GE" countries={['GE','US','GB','RU','DE']} locale="en" value={phone} onValueChange={setPhone}/>;}
