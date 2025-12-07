export default defineEventHandler(async () => {
  const products = [
    { id: '1', name: 'Kuzu Tandır', price: 180 },
    { id: '2', name: 'Mercimek Çorbası', price: 25 },
    { id: '3', name: 'Baklava', price: 24 },
    { id: '4', name: 'Mantı', price: 85 },
    { id: '5', name: 'Ezogelin Çorbası', price: 22 },
    { id: '6', name: 'Ayran', price: 6 },
    { id: '7', name: 'Beyti Sarma', price: 120 },
    { id: '8', name: 'Patlıcan Kebap', price: 95 },
    { id: '9', name: 'Çiğ Köfte', price: 75 },
    { id: '10', name: 'Karışık Meze Tabağı', price: 80 },
    { id: '11', name: 'Sigara Böreği', price: 60 },
    { id: '12', name: 'Hünkar Beğendi', price: 110 },
    { id: '13', name: 'Yayla Çorbası', price: 20 },
    { id: '14', name: 'Künefe', price: 45 },
    { id: '15', name: 'Mucver', price: 35 },
    { id: '16', name: 'Çoban Salata', price: 30 },
    { id: '17', name: 'Türk Kahvesi', price: 12 },
    { id: '18', name: 'Adana Kebap', price: 130 },
    { id: '19', name: 'Urfa Kebap', price: 125 },
    { id: '20', name: 'İskender Kebap', price: 135 }
  ]

  return products
})
