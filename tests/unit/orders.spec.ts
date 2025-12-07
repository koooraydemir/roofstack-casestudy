import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOrdersStore } from '../../stores/orders'
import type { Order } from '../../types'

describe('Orders Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should filter orders by status', () => {
    const store = useOrdersStore()
    const acceptedOrders = store.getOrdersByStatus('accepted')

    expect(acceptedOrders.length).toBeGreaterThan(0)
    acceptedOrders.forEach(order => {
      expect(order.status).toBe('accepted')
    })
  })

  it('should sort orders with newest first', () => {
    const store = useOrdersStore()
    const orders = store.getOrdersByStatus('accepted')

    if (orders.length > 1) {
      for (let i = 0; i < orders.length - 1; i++) {
        const currentId = orders[i].id.startsWith('order-')
          ? parseInt(orders[i].id.replace('order-', ''))
          : parseInt(orders[i].id)
        const nextId = orders[i + 1].id.startsWith('order-')
          ? parseInt(orders[i + 1].id.replace('order-', ''))
          : parseInt(orders[i + 1].id)

        expect(currentId).toBeGreaterThanOrEqual(nextId)
      }
    }
  })

  it('should count orders by status', () => {
    const store = useOrdersStore()
    const count = store.getOrderCount('cooking')
    const orders = store.getOrdersByStatus('cooking')

    expect(count).toBe(orders.length)
  })

  it('should move order to next status', () => {
    const store = useOrdersStore()
    const order = store.orders.find(o => o.status === 'accepted')

    if (order) {
      const orderId = order.id
      store.moveOrderToNextStatus(orderId)
      const updated = store.orders.find(o => o.id === orderId)

      expect(updated?.status).toBe('cooking')
    }
  })

  it('should add new order', () => {
    const store = useOrdersStore()
    const initialLength = store.orders.length

    const newOrder: Order = {
      id: 'order-999999',
      orderNumber: '#999999',
      dateTime: '01/01/2025 12:00PM',
      customerName: 'Test User',
      contact: '+90 555 555 5555',
      transType: 'Delivery',
      amount: 100,
      items: [{ id: '1', name: 'Test Item', price: 100, quantity: 1 }],
      notes: 'Test note',
      status: 'accepted'
    }

    store.addOrder(newOrder)

    expect(store.orders.length).toBe(initialLength + 1)
    expect(store.orders[store.orders.length - 1].customerName).toBe('Test User')
  })

  it('should not move completed order to next status', () => {
    const store = useOrdersStore()
    const completedOrder = store.orders.find(o => o.status === 'completed')

    if (completedOrder) {
      const orderId = completedOrder.id
      store.moveOrderToNextStatus(orderId)
      const updated = store.orders.find(o => o.id === orderId)

      expect(updated?.status).toBe('completed')
    }
  })
})
