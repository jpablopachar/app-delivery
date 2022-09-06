import c3 from '../assets/c3.png'
import f1 from '../assets/f1.png'
import fi1 from '../assets/fi1.png'
import i1 from '../assets/i1.png'

export const heroData = [
  {
    id: 1,
    name: 'Helado',
    description: 'Chocolate & vainilla',
    price: '5.25',
    imageSrc: i1
  },
  {
    id: 2,
    name: 'Fresas',
    description: 'Fresas Frescas',
    price: '10.25',
    imageSrc: f1
  },
  {
    id: 3,
    name: 'Pollo Broster',
    description: 'Plato De Pollo Broster',
    price: '8.25',
    imageSrc: c3
  },
  {
    id: 4,
    name: 'Pez Apanado',
    description: 'Plato De Pescado Apanado',
    price: '5.25',
    imageSrc: fi1
  }
]

export const categories = [
  {
    id: 1,
    name: 'Pollo',
    urlParamName: 'chicken'
  },
  {
    id: 2,
    name: 'Estofados',
    urlParamName: 'curry'
  },
  {
    id: 3,
    name: 'Arroz',
    urlParamName: 'rice'
  },
  {
    id: 4,
    name: 'Pescado',
    urlParamName: 'fish'
  },
  {
    id: 5,
    name: 'Frutas',
    urlParamName: 'fruits'
  },
  {
    id: 6,
    name: 'Helados',
    urlParamName: 'icecreams'
  },
  {
    id: 7,
    name: 'Bebidas',
    urlParamName: 'drinks'
  }
]
