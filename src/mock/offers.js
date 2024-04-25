import {getRandomInteger} from '../utils';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a business class',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa32',
        title: 'Child seat',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa33',
        title: 'Extra stops',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa34',
        title: 'Luggage assistance',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa41',
        title: 'Wi-Fi',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa42',
        title: 'Extra baggage',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa43',
        title: 'Complimentary snacks and drinks',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa51',
        title: 'Wi-Fi',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa52',
        title: 'Complimentary snacks and drinks',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa53',
        title: 'Priority boarding',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa54',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa55',
        title: 'In-seat power outlet',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa61',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa62',
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
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa71',
        title: 'Meal service',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa72',
        title: 'Extra legroom',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa73',
        title: 'Priority boarding',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa74',
        title: 'Extra baggage',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa81',
        title: 'Early check-in',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa82',
        title: 'Late check-out',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa83',
        title: 'Room upgrade',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa84',
        title: 'Breakfast included',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa85',
        title: 'Ocean view',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa91',
        title: 'Guided Tour',
        price: getRandomInteger(100)
      },
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa92',
        title: 'Audio Guide',
        price: getRandomInteger(100)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa21',
        title: 'Chef\'s Tasting Menu',
        price: getRandomInteger(100)
      }
    ]
  }
];


export {mockOffers};
