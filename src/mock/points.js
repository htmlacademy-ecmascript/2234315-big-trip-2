import {getRandomArrayElement, getRandomInteger, getRandomBool} from '../utils';

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-10T22:55:56.845Z',
    dateTo: '2024-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca1',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa32',
      'b4c3e4e6-9053-42ce-b747-e281314baa33',
      'b4c3e4e6-9053-42ce-b747-e281314baa34'
    ],
    type: 'taxi'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-12T10:00:00.000Z',
    dateTo: '2024-07-12T12:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca2',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa41'
    ],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-13T10:00:00.000Z',
    dateTo: '2024-07-14T10:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca3',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa51',
      'b4c3e4e6-9053-42ce-b747-e281314baa54',
      'b4c3e4e6-9053-42ce-b747-e281314baa55'
    ],
    type: 'train'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-15T10:00:00.000Z',
    dateTo: '2024-07-16T10:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca1',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa61',
      'b4c3e4e6-9053-42ce-b747-e281314baa62',
    ],
    type: 'ship'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a28090',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-17T10:00:00.000Z',
    dateTo: '2024-07-18T10:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca2',
    isFavorite: getRandomBool(0.5),
    offers: [],
    type: 'drive'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a28091',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-19T10:00:00.000Z',
    dateTo: '2024-07-20T10:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca3',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa71',
      'b4c3e4e6-9053-42ce-b747-e281314baa72',
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a28092',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-21T10:00:00.000Z',
    dateTo: '2024-07-21T12:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca1',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa81',
      'b4c3e4e6-9053-42ce-b747-e281314baa82',
      'b4c3e4e6-9053-42ce-b747-e281314baa83',
      'b4c3e4e6-9053-42ce-b747-e281314baa84',
      'b4c3e4e6-9053-42ce-b747-e281314baa85'
    ],
    type: 'check-in'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a28093',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-22T10:00:00.000Z',
    dateTo: '2024-07-22T12:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca2',
    isFavorite: getRandomBool(0.5),
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa91'
    ],
    type: 'sightseeing'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a28094',
    basePrice: getRandomInteger(8000),
    dateFrom: '2024-07-23T10:00:00.000Z',
    dateTo: '2024-07-23T12:00:00.000Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edca3',
    isFavorite: getRandomBool(0.5),
    offers: [],
    type: 'restaurant'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
