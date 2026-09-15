import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const bandCollection = await bands();

  const bandData = [
    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a1'),
      name: 'Linkin Park',
      genre: ['Alternative Rock', 'Nu Metal'],
      formedYear: 1996,
      label: 'Warner Bros',
      members: [
        'Chester Bennington',
        'Mike Shinoda',
        'Brad Delson',
        'Dave Farrell',
        'Rob Bourdon',
        'Joe Hahn'
      ],
      albums: [
        {title: 'Hybrid Theory', releaseDate: '10/24/2000', tracks: 12},
        {title: 'Meteora', releaseDate: '03/25/2003', tracks: 13}
      ],
      website: 'https://www.linkinpark.com',
      countryOfOrigin: 'United States'
    },
    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a2'),
      name: 'Foo Fighters',
      genre: ['Rock', 'Alternative Rock'],
      formedYear: 1994,
      label: 'RCA',
      members: [
        'Dave Grohl',
        'Nate Mendel',
        'Pat Smear',
        'Chris Shiflett',
        'Rami Jaffee'
      ],
      albums: [
        {
          title: 'The Colour and the Shape',
          releaseDate: '05/20/1997',
          tracks: 13
        },
        {title: 'Wasting Light', releaseDate: '04/12/2011', tracks: 11}
      ],
      website: 'https://foofighters.com',
      countryOfOrigin: 'United States'
    },
    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a3'),
      name: 'Radiohead',
      genre: ['Alternative Rock', 'Art Rock'],
      formedYear: 1985,
      label: 'XL Recordings',
      members: [
        'Thom Yorke',
        'Jonny Greenwood',
        'Colin Greenwood',
        "Ed O'Brien",
        'Philip Selway'
      ],
      albums: [
        {title: 'OK Computer', releaseDate: '05/21/1997', tracks: 12},
        {title: 'In Rainbows', releaseDate: '10/10/2007', tracks: 10}
      ],
      website: 'https://www.radiohead.com',
      countryOfOrigin: 'United Kingdom'
    },
    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a4'),
      name: 'Daft Punk',
      genre: ['Electronic', 'House'],
      formedYear: 1993,
      label: 'Virgin',
      members: ['Thomas Bangalter', 'Guy-Manuel de Homem-Christo'],
      albums: [
        {title: 'Discovery', releaseDate: '03/12/2001', tracks: 14},
        {title: 'Random Access Memories', releaseDate: '05/17/2013', tracks: 13}
      ],
      website: 'https://daftpunk.com',
      countryOfOrigin: 'France'
    },
    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a5'),
      name: 'The Beatles',
      genre: ['Rock', 'Pop'],
      formedYear: 1960,
      label: 'Apple',
      members: [
        'John Lennon',
        'Paul McCartney',
        'George Harrison',
        'Ringo Starr'
      ],
      albums: [
        {title: 'Abbey Road', releaseDate: '09/26/1969', tracks: 17},
        {
          title: "Sgt. Pepper's Lonely Hearts Club Band",
          releaseDate: '06/01/1967',
          tracks: 13
        }
      ],
      website: 'https://www.thebeatles.com',
      countryOfOrigin: 'United Kingdom'
    },

    // 15 additional bands (sequential IDs)

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a6'),
      name: 'Nirvana',
      genre: ['Grunge'],
      formedYear: 1987,
      label: 'DGC',
      members: ['Kurt Cobain', 'Krist Novoselic', 'Dave Grohl'],
      albums: [{title: 'Nevermind', releaseDate: '09/24/1991', tracks: 12}],
      website: 'https://nirvana.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a7'),
      name: 'Metallica',
      genre: ['Heavy Metal'],
      formedYear: 1981,
      label: 'Blackened',
      members: [
        'James Hetfield',
        'Lars Ulrich',
        'Kirk Hammett',
        'Robert Trujillo'
      ],
      albums: [
        {title: 'Master of Puppets', releaseDate: '03/03/1986', tracks: 8}
      ],
      website: 'https://www.metallica.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a8'),
      name: 'Coldplay',
      genre: ['Alternative Rock'],
      formedYear: 1996,
      label: 'Parlophone',
      members: [
        'Chris Martin',
        'Jonny Buckland',
        'Guy Berryman',
        'Will Champion'
      ],
      albums: [{title: 'Parachutes', releaseDate: '07/10/2000', tracks: 10}],
      website: 'https://www.coldplay.com',
      countryOfOrigin: 'United Kingdom'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1a9'),
      name: 'Arctic Monkeys',
      genre: ['Indie Rock'],
      formedYear: 2002,
      label: 'Domino',
      members: ['Alex Turner', 'Jamie Cook', "Nick O'Malley", 'Matt Helders'],
      albums: [{title: 'AM', releaseDate: '09/09/2013', tracks: 12}],
      website: 'https://www.arcticmonkeys.com',
      countryOfOrigin: 'United Kingdom'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1aa'),
      name: 'Red Hot Chili Peppers',
      genre: ['Funk Rock'],
      formedYear: 1983,
      label: 'Warner Bros',
      members: ['Anthony Kiedis', 'Flea', 'Chad Smith', 'John Frusciante'],
      albums: [
        {title: 'Californication', releaseDate: '06/08/1999', tracks: 15}
      ],
      website: 'https://redhotchilipeppers.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1ab'),
      name: 'Pearl Jam',
      genre: ['Grunge'],
      formedYear: 1990,
      label: 'Epic',
      members: [
        'Eddie Vedder',
        'Stone Gossard',
        'Jeff Ament',
        'Mike McCready',
        'Matt Cameron'
      ],
      albums: [{title: 'Ten', releaseDate: '08/27/1991', tracks: 11}],
      website: 'https://pearljam.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1ac'),
      name: 'Imagine Dragons',
      genre: ['Pop Rock'],
      formedYear: 2008,
      label: 'Interscope',
      members: ['Dan Reynolds', 'Wayne Sermon', 'Ben McKee', 'Daniel Platzman'],
      albums: [{title: 'Night Visions', releaseDate: '09/04/2012', tracks: 13}],
      website: 'https://www.imaginedragonsmusic.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1ad'),
      name: 'Green Day',
      genre: ['Punk Rock'],
      formedYear: 1987,
      label: 'Reprise',
      members: ['Billie Joe Armstrong', 'Mike Dirnt', 'Tre Cool'],
      albums: [
        {title: 'American Idiot', releaseDate: '09/21/2004', tracks: 13}
      ],
      website: 'https://www.greenday.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1ae'),
      name: 'U2',
      genre: ['Rock'],
      formedYear: 1976,
      label: 'Island',
      members: ['Bono', 'The Edge', 'Adam Clayton', 'Larry Mullen Jr.'],
      albums: [
        {title: 'The Joshua Tree', releaseDate: '03/09/1987', tracks: 11}
      ],
      website: 'https://www.u2.com',
      countryOfOrigin: 'Ireland'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1af'),
      name: 'The Rolling Stones',
      genre: ['Rock'],
      formedYear: 1962,
      label: 'Decca',
      members: [
        'Mick Jagger',
        'Keith Richards',
        'Charlie Watts',
        'Ronnie Wood'
      ],
      albums: [
        {title: 'Sticky Fingers', releaseDate: '04/23/1971', tracks: 10}
      ],
      website: 'https://rollingstones.com',
      countryOfOrigin: 'United Kingdom'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1b0'),
      name: 'Muse',
      genre: ['Alternative Rock'],
      formedYear: 1994,
      label: 'Warner Bros',
      members: ['Matt Bellamy', 'Chris Wolstenholme', 'Dominic Howard'],
      albums: [{title: 'Absolution', releaseDate: '09/15/2003', tracks: 14}],
      website: 'https://www.muse.mu',
      countryOfOrigin: 'United Kingdom'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1b1'),
      name: 'The Killers',
      genre: ['Indie Rock'],
      formedYear: 2001,
      label: 'Island',
      members: [
        'Brandon Flowers',
        'Dave Keuning',
        'Mark Stoermer',
        'Ronnie Vannucci Jr.'
      ],
      albums: [{title: 'Hot Fuss', releaseDate: '06/07/2004', tracks: 11}],
      website: 'https://www.thekillersmusic.com',
      countryOfOrigin: 'United States'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1b2'),
      name: 'Queen',
      genre: ['Rock'],
      formedYear: 1970,
      label: 'EMI',
      members: ['Freddie Mercury', 'Brian May', 'Roger Taylor', 'John Deacon'],
      albums: [
        {title: 'A Night at the Opera', releaseDate: '11/21/1975', tracks: 12}
      ],
      website: 'https://www.queenonline.com',
      countryOfOrigin: 'United Kingdom'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1b3'),
      name: 'AC/DC',
      genre: ['Hard Rock'],
      formedYear: 1973,
      label: 'Atlantic',
      members: ['Angus Young', 'Brian Johnson', 'Cliff Williams', 'Phil Rudd'],
      albums: [{title: 'Back in Black', releaseDate: '07/25/1980', tracks: 10}],
      website: 'https://www.acdc.com',
      countryOfOrigin: 'Australia'
    },

    {
      _id: new ObjectId('64b7c2f8f1d4c3b2f8e4b1b4'),
      name: 'The Strokes',
      genre: ['Indie Rock'],
      formedYear: 1998,
      label: 'RCA',
      members: [
        'Julian Casablancas',
        'Nick Valensi',
        'Albert Hammond Jr.',
        'Nikolai Fraiture',
        'Fabrizio Moretti'
      ],
      albums: [{title: 'Is This It', releaseDate: '07/30/2001', tracks: 11}],
      website: 'https://www.thestrokes.com',
      countryOfOrigin: 'United States'
    }
  ];

  await bandCollection.insertMany(bandData);

  console.log('Seeded 20 bands');

  await closeConnection();
};

main();
