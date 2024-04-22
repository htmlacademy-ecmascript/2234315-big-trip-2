import {getRandomInteger} from '../utils';

const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edca1',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edca2',
    description: 'Geneva is a city located in Switzerland, known for its beautiful Lake Geneva and stunning mountain views. It is a popular destination for tourists and business travelers alike, with a rich history, stunning architecture, and a vibrant cultural scene. ',
    name: 'Geneva',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Geneva parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Lake Geneva'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'St. Pierre Cathedral'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edca3',
    description: 'Amsterdam is the capital and largest city in the European country of the Netherlands. Amsterdam is famous for its canals and dikes.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Amsterdam canals and dikes'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(50)}`,
        description: 'Amsterdam buildings'
      }
    ]
  }
];

export {mockDestinations};
