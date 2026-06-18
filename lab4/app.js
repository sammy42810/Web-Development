import * as equipmentData from './data/equipment.js';
import { dbConnection, closeConnection } from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let item1 = undefined;
let item2 = undefined;
let item3 = undefined;

try {
  item1 = await equipmentData.createEquipmentItem(
    'Sony A6400 Camera',
    'camera',
    'Media Lab - Shelf B',
    'Body only.',
    {
      manufacturer: 'Sony',
      modelNumber: 'A6400',
      serialNumber: 'SN-A6400-18492',
      replacementCost: 899.99,
      acquiredOn: '09/14/2022'
    }
  );
  console.log('Created item 1:');
  console.log(item1);
} catch (e) {
  console.log(e);
}

try {
  item2 = await equipmentData.createEquipmentItem(
    'Shure SM58 Microphone',
    'audio',
    'Media Lab - Drawer 3',
    '',
    {
      manufacturer: 'Shure',
      modelNumber: 'SM-58',
      serialNumber: 'SN-SM58-33901',
      replacementCost: 99,
      acquiredOn: '01/08/2021'
    }
  );
  console.log('Created item 2:');
  console.log(item2);
} catch (e) {
  console.log(e);
}

try {
  const allItems = await equipmentData.getAllEquipmentItems();
  console.log('All equipment items:');
  console.log(allItems);
} catch (e) {
  console.log(e);
}

try {
  item3 = await equipmentData.createEquipmentItem(
    'Manfrotto 504X Tripod',
    'tripod',
    'Storage Room - Rack A',
    'Fluid head included.',
    {
      manufacturer: 'Manfrotto',
      modelNumber: '504X',
      serialNumber: 'MF-504X-77214',
      replacementCost: 449.95,
      acquiredOn: '03/22/2023'
    }
  );
  console.log('Created item 3:');
  console.log(item3);
} catch (e) {
  console.log(e);
}

try {
  item1 = await equipmentData.updateEquipmentLocation(
    item1._id,
    'Media Lab - Locked Cabinet A'
  );
  console.log('Item 1 with updated location:');
  console.log(item1);
} catch (e) {
  console.log(e);
}

try {
  const removed = await equipmentData.removeEquipmentItem(item2._id);
  console.log('Removed item 2:');
  console.log(removed);
} catch (e) {
  console.log(e);
}

try {
  const allItems = await equipmentData.getAllEquipmentItems();
  console.log('All equipment items after removal:');
  console.log(allItems);
} catch (e) {
  console.log(e);
}

// --- Error cases ---

console.log('\n--- createEquipmentItem bad input tests ---');

// name not provided
try {
  await equipmentData.createEquipmentItem(
    undefined, 'camera', 'Room 1', 'notes',
    { manufacturer: 'Sony', modelNumber: 'A6400', serialNumber: 'SN-A6400-99999', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// name too short
try {
  await equipmentData.createEquipmentItem(
    'AB', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Sony', modelNumber: 'A6400', serialNumber: 'SN-A6400-99999', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// name has invalid characters
try {
  await equipmentData.createEquipmentItem(
    'Camera #1!', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Sony', modelNumber: 'A6400', serialNumber: 'SN-A6400-99999', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// duplicate name
try {
  await equipmentData.createEquipmentItem(
    'sony a6400 camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Sony', modelNumber: 'A6400', serialNumber: 'SN-A6400-99999', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// invalid category
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'book', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// notes with repeated characters
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', '----------',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// location with invalid characters
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room #1!', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// Asset missing a field
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500 }
  );
} catch (e) { console.log(e); }

// Asset has extra field
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '01/01/2020', extra: 'bad' }
  );
} catch (e) { console.log(e); }

// ReplacementCost is 0
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 0, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// replacementCost string that cannot convert
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 'free', acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// replacementCost as valid string (should succeed the cost check, but serial is dup of item3 so use unique)
try {
  await equipmentData.createEquipmentItem(
    'Test String Cost', 'accessory', 'Shelf 1', 'notes',
    { manufacturer: 'Acme', modelNumber: 'TS-01', serialNumber: 'TS-STRING-00001', replacementCost: '25.50', acquiredOn: '06/01/2024' }
  );
} catch (e) { console.log(e); }

// acquiredOn invalid date (Feb 30)
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '02/30/2022' }
  );
} catch (e) { console.log(e); }

// acquiredOn wrong format
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'NK-Z6-000011', replacementCost: 500, acquiredOn: '1/1/2020' }
  );
} catch (e) { console.log(e); }

// serialNumber not uppercase
try {
  await equipmentData.createEquipmentItem(
    'Nikon Z6 Camera', 'camera', 'Room 1', 'notes',
    { manufacturer: 'Nikon', modelNumber: 'Z6', serialNumber: 'sn-z6-000011', replacementCost: 500, acquiredOn: '01/01/2020' }
  );
} catch (e) { console.log(e); }

// duplicate serialNumber (same as item1's serial)
try {
  await equipmentData.createEquipmentItem(
    'Canon EOS R5', 'camera', 'Room 2', 'notes',
    { manufacturer: 'Canon', modelNumber: 'EOS-R5', serialNumber: 'SN-A6400-18492', replacementCost: 1200, acquiredOn: '05/10/2021' }
  );
} catch (e) { console.log(e); }

// no arguments
try {
  await equipmentData.createEquipmentItem();
} catch (e) { console.log(e); }

console.log('\n--- removeEquipmentItem bad input tests ---');

// remove item that does not exist
try {
  await equipmentData.removeEquipmentItem('64f5a3b2c1e4d5f6a7b8c9d0');
} catch (e) { console.log(e); }

// invalid ObjectId string
try {
  await equipmentData.removeEquipmentItem('notanid');
} catch (e) { console.log(e); }

// id not a string
try {
  await equipmentData.removeEquipmentItem(12345);
} catch (e) { console.log(e); }

// no id
try {
  await equipmentData.removeEquipmentItem();
} catch (e) { console.log(e); }

console.log('\n--- updateEquipmentLocation bad input tests ---');

// item does not exist
try {
  await equipmentData.updateEquipmentLocation('64f5a3b2c1e4d5f6a7b8c9d0', 'New Room 5');
} catch (e) { console.log(e); }

// newLocation is invalid
try {
  await equipmentData.updateEquipmentLocation(item1._id, 'Room #5!');
} catch (e) { console.log(e); }

// newLocation is empty string
try {
  await equipmentData.updateEquipmentLocation(item1._id, '   ');
} catch (e) { console.log(e); }

// newLocation same as current (case insensitive)
try {
  await equipmentData.updateEquipmentLocation(item1._id, 'media lab - locked cabinet a');
} catch (e) { console.log(e); }

// newLocation too short
try {
  await equipmentData.updateEquipmentLocation(item1._id, 'AB');
} catch (e) { console.log(e); }

// invalid id
try {
  await equipmentData.updateEquipmentLocation('notanid', 'New Room 5');
} catch (e) { console.log(e); }

console.log('\n--- getEquipmentById bad input tests ---');

// id does not exist in DB
try {
  await equipmentData.getEquipmentById('64f5a3b2c1e4d5f6a7b8c9d0');
} catch (e) { console.log(e); }

// invalid ObjectId string
try {
  await equipmentData.getEquipmentById('notanid');
} catch (e) { console.log(e); }

// id is not a string
try {
  await equipmentData.getEquipmentById(12345);
} catch (e) { console.log(e); }

// no id provided
try {
  await equipmentData.getEquipmentById();
} catch (e) { console.log(e); }

await closeConnection();
console.log('Done!');
