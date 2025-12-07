import { defineStore } from 'pinia'
import type { Order, OrderStatus } from '~/types'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [
      {
        id: '3',
        orderNumber: '#988123',
        dateTime: '01/01/2020 at 2:14Pm',
        customerName: 'Mehmet Demir',
        contact: '+90 534 789 0123',
        transType: 'Delivery' as const,
        amount: 458,
        paymentMethod: 'COD' as const,
        status: 'accepted' as OrderStatus,
        items: [
          { id: '1', name: 'Kuzu Tandır', price: 180, quantity: 2 },
          { id: '2', name: 'Mercimek Çorbası', price: 25, quantity: 2 },
          { id: '3', name: 'Baklava', price: 24, quantity: 2 }
        ],
        notes: 'Salata ve yeşil sos ekleyin lütfen.'
      },
      {
        id: '4',
        orderNumber: '#988122',
        dateTime: '01/01/2020 at 2:09Pm',
        customerName: 'Ayşe Şahin',
        contact: '+90 535 234 5678',
        transType: 'Takeaway' as const,
        amount: 195,
        status: 'accepted' as OrderStatus,
        items: [
          { id: '4', name: 'Mantı', price: 85, quantity: 1 },
          { id: '5', name: 'Ezogelin Çorbası', price: 22, quantity: 1 },
          { id: '6', name: 'Ayran', price: 6, quantity: 2 }
        ],
        notes: 'Ekstra yoğurt olsun.'
      },
      {
        id: '5',
        orderNumber: '#988115',
        dateTime: '01/01/2020 at 1:45Pm',
        customerName: 'Can Öztürk',
        contact: '+90 536 345 6789',
        transType: 'Delivery' as const,
        amount: 290,
        paymentMethod: 'COD' as const,
        status: 'cooking' as OrderStatus,
        items: [
          { id: '7', name: 'Beyti Sarma', price: 120, quantity: 1 },
          { id: '8', name: 'Patlıcan Kebap', price: 95, quantity: 1 },
          { id: '9', name: 'Çiğ Köfte', price: 75, quantity: 1 }
        ],
        notes: 'Acılı olsun hepsi.'
      },
      {
        id: '6',
        orderNumber: '#988114',
        dateTime: '01/01/2020 at 1:40Pm',
        customerName: 'Elif Yıldız',
        contact: '+90 537 456 7890',
        transType: 'Takeaway' as const,
        amount: 140,
        status: 'cooking' as OrderStatus,
        items: [
          { id: '10', name: 'Karışık Meze Tabağı', price: 80, quantity: 1 },
          { id: '11', name: 'Sigara Böreği', price: 60, quantity: 1 }
        ]
      },
      {
        id: '7',
        orderNumber: '#988110',
        dateTime: '01/01/2020 at 1:20Pm',
        customerName: 'Burak Arslan',
        contact: '+90 538 567 8901',
        transType: 'Delivery' as const,
        amount: 350,
        paymentMethod: 'COD' as const,
        status: 'parcel-ready' as OrderStatus,
        items: [
          { id: '12', name: 'Hünkar Beğendi', price: 110, quantity: 2 },
          { id: '13', name: 'Yayla Çorbası', price: 20, quantity: 2 },
          { id: '14', name: 'Künefe', price: 45, quantity: 2 }
        ],
        notes: 'Çatal bıçak koymayın, evde var.'
      },
      {
        id: '8',
        orderNumber: '#988109',
        dateTime: '01/01/2020 at 1:15Pm',
        customerName: 'Selin Kara',
        contact: '+90 539 678 9012',
        transType: 'Takeaway' as const,
        amount: 120,
        status: 'parcel-ready' as OrderStatus,
        items: [
          { id: '15', name: 'Mucver', price: 35, quantity: 1 },
          { id: '16', name: 'Çoban Salata', price: 30, quantity: 1 },
          { id: '17', name: 'Türk Kahvesi', price: 12, quantity: 2 }
        ]
      },
      {
        id: '9',
        orderNumber: '#988105',
        dateTime: '01/01/2020 at 12:50Pm',
        customerName: 'Kerem Aydın',
        contact: '+90 540 789 0123',
        transType: 'Delivery' as const,
        amount: 410,
        paymentMethod: 'COD' as const,
        status: 'delivered' as OrderStatus,
        items: [
          { id: '18', name: 'Adana Kebap', price: 130, quantity: 2 },
          { id: '19', name: 'Urfa Kebap', price: 125, quantity: 1 },
          { id: '2', name: 'Mercimek Çorbası', price: 25, quantity: 3 }
        ],
        notes: 'Bol salata ekleyin.'
      },
      {
        id: '10',
        orderNumber: '#988104',
        dateTime: '01/01/2020 at 12:45Pm',
        customerName: 'Deniz Çelik',
        contact: '+90 541 890 1234',
        transType: 'Takeaway' as const,
        amount: 85,
        status: 'delivered' as OrderStatus,
        items: [
          { id: '3', name: 'Baklava', price: 24, quantity: 1 }
        ],
        notes: 'Hediye paketi olarak hazırlayın.'
      },
      {
        id: '11',
        orderNumber: '#988100',
        dateTime: '01/01/2020 at 12:20Pm',
        customerName: 'Emre Koç',
        contact: '+90 542 901 2345',
        transType: 'Delivery' as const,
        amount: 285,
        paymentMethod: 'COD' as const,
        status: 'completed' as OrderStatus,
        items: [
          { id: '20', name: 'İskender Kebap', price: 135, quantity: 1 },
          { id: '4', name: 'Mantı', price: 85, quantity: 1 },
          { id: '6', name: 'Ayran', price: 6, quantity: 2 }
        ]
      },
      {
        id: '12',
        orderNumber: '#988099',
        dateTime: '01/01/2020 at 12:15Pm',
        customerName: 'Merve Aktaş',
        contact: '+90 543 012 3456',
        transType: 'Takeaway' as const,
        amount: 155,
        status: 'completed' as OrderStatus,
        items: [
          { id: '10', name: 'Karışık Meze Tabağı', price: 80, quantity: 1 },
          { id: '14', name: 'Künefe', price: 45, quantity: 1 }
        ],
        notes: 'Çok teşekkürler, harika yemeklerdi!'
      }
    ] as Order[]
  }),

  getters: {
    getOrdersByStatus: (state) => (status: OrderStatus) => {
      return state.orders
        .filter(order => order.status === status)
        .sort((a, b) => {
          const getTimestamp = (id: string) => {
            if (id.startsWith('order-')) {
              return parseInt(id.replace('order-', ''))
            }
            return parseInt(id)
          }
          return getTimestamp(b.id) - getTimestamp(a.id)
        })
    },

    getOrderCount: (state) => (status: OrderStatus) => {
      return state.orders.filter(order => order.status === status).length
    }
  },

  actions: {
    moveOrderToNextStatus(orderId: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (!order) return

      const statusFlow: OrderStatus[] = ['accepted', 'cooking', 'parcel-ready', 'delivered', 'completed']
      const currentIndex = statusFlow.indexOf(order.status)

      if (currentIndex < statusFlow.length - 1) {
        order.status = statusFlow[currentIndex + 1]
      }
    },

    addOrder(order: Order) {
      this.orders.push(order)
    }
  }
})
