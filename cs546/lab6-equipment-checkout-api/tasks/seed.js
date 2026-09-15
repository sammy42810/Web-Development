import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {equipment} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

// Direct inserts are used here (instead of the data functions) so that
// historical checkout/due dates can be seeded for testing overdueEquipmentItems().
const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const equipmentCollection = await equipment();

  const items = [
    {
      name: 'Sony A6400 Camera',
      category: 'camera',
      status: 'checked_out',
      location: 'Media Lab - Shelf B',
      notes: 'Body only.',
      asset: {
        manufacturer: 'Sony',
        modelNumber: 'A6400',
        serialNumber: 'SN-A6400-18492',
        replacementCost: 899.99,
        acquiredOn: '09/14/2022'
      },
      checkoutHistory: [
        {
          _id: new ObjectId(),
          borrowerName: "Mary-Ann O'Connor",
          borrowerEmail: 'mary.oconnor@example.com',
          checkedOutOn: '01/10/2026',
          dueOn: '01/17/2026',
          returnedOn: '01/16/2026',
          notes: 'Used for Media Production project.'
        },
        {
          _id: new ObjectId(),
          borrowerName: 'Patrick Hill',
          borrowerEmail: 'phill@stevens.edu',
          checkedOutOn: '06/20/2026',
          dueOn: '06/27/2026',
          returnedOn: null,
          notes: 'For Senior Design demo.'
        }
      ]
    },
    {
      name: 'Shure SM58 Microphone',
      category: 'audio',
      status: 'checked_out',
      location: 'Media Lab - Drawer 3',
      notes: '',
      asset: {
        manufacturer: 'Shure',
        modelNumber: 'SM-58',
        serialNumber: 'SN-SM58-33901',
        replacementCost: 99,
        acquiredOn: '01/08/2021'
      },
      checkoutHistory: [
        {
          _id: new ObjectId(),
          borrowerName: "Mary-Ann O'Connor",
          borrowerEmail: 'mary.oconnor@example.com',
          checkedOutOn: '06/10/2026',
          dueOn: '06/17/2026',
          returnedOn: null,
          notes: 'Overdue - not yet returned.'
        }
      ]
    },
    {
      name: 'Manfrotto 504X Tripod',
      category: 'tripod',
      status: 'available',
      location: 'Storage Room - Rack A',
      notes: 'Fluid head included.',
      asset: {
        manufacturer: 'Manfrotto',
        modelNumber: '504X',
        serialNumber: 'MF-504X-77214',
        replacementCost: 449.95,
        acquiredOn: '03/22/2023'
      },
      checkoutHistory: []
    },
    {
      name: 'Dell XPS 15 Laptop',
      category: 'laptop',
      status: 'checked_out',
      location: 'IT Cage - Locker 4',
      notes: 'Includes charger.',
      asset: {
        manufacturer: 'Dell',
        modelNumber: 'XPS15-9530',
        serialNumber: 'DL-XPS15-55210',
        replacementCost: 1799.99,
        acquiredOn: '11/02/2022'
      },
      checkoutHistory: [
        {
          _id: new ObjectId(),
          borrowerName: 'Patrick Hill',
          borrowerEmail: 'phill@stevens.edu',
          checkedOutOn: '05/05/2026',
          dueOn: '06/12/2026',
          returnedOn: null,
          notes: 'Overdue - senior design build.'
        }
      ]
    },
    {
      name: 'Canon EOS R5',
      category: 'camera',
      status: 'available',
      location: 'Media Lab - Shelf B',
      notes: 'Includes 24-105mm lens.',
      asset: {
        manufacturer: 'Canon',
        modelNumber: 'EOS-R5',
        serialNumber: 'CN-EOSR5-40021',
        replacementCost: 3899,
        acquiredOn: '02/18/2023'
      },
      checkoutHistory: [
        {
          _id: new ObjectId(),
          borrowerName: 'Jordan Blake',
          borrowerEmail: 'jblake@stevens.edu',
          checkedOutOn: '04/01/2026',
          dueOn: '04/08/2026',
          returnedOn: '04/07/2026',
          notes: 'Photojournalism assignment.'
        }
      ]
    },
    {
      name: 'Rode NTG3 Shotgun Mic',
      category: 'audio',
      status: 'available',
      location: 'Media Lab - Drawer 2',
      notes: '',
      asset: {
        manufacturer: 'Rode',
        modelNumber: 'NTG3',
        serialNumber: 'RD-NTG3-11837',
        replacementCost: 699,
        acquiredOn: '07/30/2021'
      },
      checkoutHistory: []
    },
    {
      name: 'Elgato Key Light',
      category: 'lighting',
      status: 'available',
      location: 'Media Lab - Shelf C',
      notes: 'Includes desk mount.',
      asset: {
        manufacturer: 'Elgato',
        modelNumber: 'KeyLight-Air',
        serialNumber: 'EG-KLA-90213',
        replacementCost: 129.99,
        acquiredOn: '05/12/2022'
      },
      checkoutHistory: []
    },
    {
      name: 'Aputure 120D Light',
      category: 'lighting',
      status: 'checked_out',
      location: 'Media Lab - Shelf C',
      notes: 'Includes softbox.',
      asset: {
        manufacturer: 'Aputure',
        modelNumber: '120D-Mark2',
        serialNumber: 'AP-120D-22841',
        replacementCost: 749,
        acquiredOn: '08/09/2022'
      },
      checkoutHistory: [
        {
          _id: new ObjectId(),
          borrowerName: 'Jordan Blake',
          borrowerEmail: 'jblake@stevens.edu',
          checkedOutOn: '06/28/2026',
          dueOn: '07/12/2026',
          returnedOn: null,
          notes: 'Not overdue yet - due in the future.'
        }
      ]
    },
    {
      name: 'MacBook Pro 16',
      category: 'laptop',
      status: 'available',
      location: 'IT Cage - Locker 1',
      notes: 'M2 Pro, 16GB RAM.',
      asset: {
        manufacturer: 'Apple',
        modelNumber: 'MBP16-M2Pro',
        serialNumber: 'AP-MBP16-77002',
        replacementCost: 2499,
        acquiredOn: '01/15/2023'
      },
      checkoutHistory: []
    },
    {
      name: 'Zoom H6 Recorder',
      category: 'audio',
      status: 'available',
      location: 'Media Lab - Drawer 1',
      notes: 'Includes windscreen.',
      asset: {
        manufacturer: 'Zoom',
        modelNumber: 'H6',
        serialNumber: 'ZM-H6-30045',
        replacementCost: 349.99,
        acquiredOn: '10/03/2021'
      },
      checkoutHistory: []
    },
    {
      name: 'DJI Ronin SC Gimbal',
      category: 'accessory',
      status: 'available',
      location: 'Media Lab - Shelf D',
      notes: '',
      asset: {
        manufacturer: 'DJI',
        modelNumber: 'RoninSC',
        serialNumber: 'DJ-RSC-66210',
        replacementCost: 449,
        acquiredOn: '06/21/2022'
      },
      checkoutHistory: []
    },
    {
      name: 'Epson Pro Projector',
      category: 'accessory',
      status: 'available',
      location: 'Conference Room B',
      notes: 'Includes HDMI cable.',
      asset: {
        manufacturer: 'Epson',
        modelNumber: 'ProL610U',
        serialNumber: 'EP-L610-51239',
        replacementCost: 1899,
        acquiredOn: '03/11/2022'
      },
      checkoutHistory: []
    }
  ];

  await equipmentCollection.insertMany(items);

  console.log(`Seeded ${items.length} equipment items`);

  await closeConnection();
};

main();
