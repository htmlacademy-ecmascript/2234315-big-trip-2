import { getRandomInteger } from '../utils/utils.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '11',
        title: 'Upgrade to a business class',
        price: getRandomInteger(100)
      },
      {
        id: '12',
        title: 'Child seat',
        price: getRandomInteger(100)
      },
      {
        id: '13',
        title: 'Extra stops',
        price: getRandomInteger(100)
      },
      {
        id: '14',
        title: 'Luggage assistance',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '21',
        title: 'Wi-Fi',
        price: getRandomInteger(100)
      },
      {
        id: '22',
        title: 'Extra baggage',
        price: getRandomInteger(100)
      },
      {
        id: '23',
        title: 'Complimentary snacks and drinks',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '31',
        title: 'Wi-Fi',
        price: getRandomInteger(100)
      },
      {
        id: '32',
        title: 'Complimentary snacks and drinks',
        price: getRandomInteger(100)
      },
      {
        id: '33',
        title: 'Priority boarding',
        price: getRandomInteger(100)
      },
      {
        id: '34',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: '35',
        title: 'In-seat power outlet',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '41',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: '42',
        title: 'Spa Access',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'drive',
    offers: []
  },
  {
    type: 'flight',
    offers: [
      {
        id: '51',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: '52',
        title: 'Extra legroom',
        price: getRandomInteger(100)
      },
      {
        id: '53',
        title: 'Priority boarding',
        price: getRandomInteger(100)
      },
      {
        id: '54',
        title: 'Extra baggage',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '61',
        title: 'Early check-in',
        price: getRandomInteger(100)
      },
      {
        id: '62',
        title: 'Late check-out',
        price: getRandomInteger(100)
      },
      {
        id: '63',
        title: 'Room upgrade',
        price: getRandomInteger(100)
      },
      {
        id: '64',
        title: 'Breakfast included',
        price: getRandomInteger(100)
      },
      {
        id: '65',
        title: 'Ocean view',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '71',
        title: 'Guided Tour',
        price: getRandomInteger(100)
      },
      {
        id: '72',
        title: 'Audio Guide',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '81',
        title: 'Chef\'s Tasting Menu',
        price: getRandomInteger(100)
      }
    ]
  }
];


export { mockOffers };
