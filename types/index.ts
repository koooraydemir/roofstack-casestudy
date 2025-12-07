export interface Product {
  id: string
  name: string
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  dateTime: string
  customerName: string
  contact: string
  transType: 'Delivery' | 'Takeaway'
  amount: number
  paymentMethod?: 'COD' | 'Online'
  status: OrderStatus
  items: OrderItem[]
  notes?: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export type OrderStatus = 'accepted' | 'cooking' | 'parcel-ready' | 'delivered' | 'completed'
