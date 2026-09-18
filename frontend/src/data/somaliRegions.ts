export interface SomaliCity {
  id: string;
  name: string;
  nameSo: string;
  deliveryFee: number;
  estimatedDelivery: string;
  districts: string[];
}

export const SOMALI_CITIES: SomaliCity[] = [
  {
    id: 'mogadishu',
    name: 'Mogadishu',
    nameSo: 'Muqdisho',
    deliveryFee: 2.0,
    estimatedDelivery: 'Same Day (2 - 5 Hours)',
    districts: [
      'Hodan',
      'Waberi',
      'Wadajir (Medina)',
      'Hawl Wadaag',
      'Hamar Weyne',
      'Hamar Jajab',
      'Kaaraan',
      'Yaqshid',
      'Bondhere',
      'Dharkenley',
      'Daynile',
      'Shibis',
      'Shangani',
      'Abdiaziz',
      'Kahda',
      'Darussalam',
    ],
  },
  {
    id: 'hargeisa',
    name: 'Hargeisa',
    nameSo: 'Hargeysa',
    deliveryFee: 5.0,
    estimatedDelivery: '1 - 2 Business Days',
    districts: [
      '26 June',
      '18 May',
      'Ahmed Dhagah',
      'Gacan Libaax',
      'Ibrahim Koodbuur',
    ],
  },
  {
    id: 'garowe',
    name: 'Garowe',
    nameSo: 'Garoowe',
    deliveryFee: 5.0,
    estimatedDelivery: '1 - 2 Business Days',
    districts: ['Waaberi', 'Hodan', 'Hantiwadaag', 'Israac'],
  },
  {
    id: 'bosaso',
    name: 'Bosaso',
    nameSo: 'Boosaaso',
    deliveryFee: 5.0,
    estimatedDelivery: '2 - 3 Business Days',
    districts: ['Bander Qasim', 'Biyo Kulule', 'Gumeys', 'Ridwan'],
  },
  {
    id: 'kismayo',
    name: 'Kismayo',
    nameSo: 'Kismaayo',
    deliveryFee: 5.0,
    estimatedDelivery: '1 - 2 Business Days',
    districts: ['Calanleey', 'Shaqaalaha', 'Guulwade', 'Farjano'],
  },
  {
    id: 'baidoa',
    name: 'Baidoa',
    nameSo: 'Baydhabo',
    deliveryFee: 5.0,
    estimatedDelivery: '2 - 3 Business Days',
    districts: ['Isha', 'Berdale', 'Horseed', 'Wadajir'],
  },
  {
    id: 'galkayo',
    name: 'Galkayo',
    nameSo: 'Gaalkacyo',
    deliveryFee: 5.0,
    estimatedDelivery: '2 - 3 Business Days',
    districts: ['Garsoor', 'Israac', 'Wadajir', 'Horumar'],
  },
];
