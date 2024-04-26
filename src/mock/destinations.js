import { getRandomInteger } from '../utils';

const mockDestinations = [
  {
    id: '1',
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    id: '2',
    description:
      'Geneva is a city located in Switzerland, known for its beautiful Lake Geneva and stunning mountain views. It is a popular destination for tourists and business travelers alike, with a rich history, stunning architecture, and a vibrant cultural scene. ',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Geneva parliament building',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Lake Geneva',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'St. Pierre Cathedral',
      },
    ],
  },
  {
    id: '3',
    description:
      'Amsterdam is the capital and largest city in the European country of the Netherlands. Amsterdam is famous for its canals and dikes.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Amsterdam canals and dikes',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Amsterdam buildings',
      },
    ],
  },
  {
    id: '4',
    description:
      'Milan, the fashion and design capital of Italy, is a vibrant city that effortlessly combines its storied past with a cutting-edge, contemporary vibe. From the iconic Duomo and the elegant Galleria Vittorio Emanuele II to the city\'s thriving culinary scene and world-renowned shopping districts, Milan offers a unique blend of art, architecture, and modern sophistication that captivates visitors from around the globe.',
    name: 'Milan',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Duomo di Milano',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Castello Sforzesco',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Galleria Vittorio Emanuele II',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'The Fashion District - Quadrilatero della Moda',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Brera Art Gallery',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Teatro alla Scala',
      },
    ],
  },
  {
    id: '5',
    description:
      'London, the majestic capital of the United Kingdom, is a city steeped in rich history, cultural heritage, and modern attractions. Visitors can immerse themselves in the grandeur of royal palaces, explore world-renowned museums, stroll through picturesque parks, and indulge in the city\'s diverse culinary scene. As a dynamic metropolis that seamlessly blends centuries-old traditions with an innovative spirit, London stands as one of the most captivating tourist destinations in Europe.',
    name: 'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Buckingham Palace',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Tower Bridge',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'The British Museum',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Big Ben and the Houses of Parliament',
      },
    ],
  },
];

export { mockDestinations };
