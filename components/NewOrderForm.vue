<template>
  <div class="bg-white h-full flex flex-col">
    <div class="px-4 md:px-6 py-3 md:py-4">
      <div class="flex items-center gap-3">
        <Bars3Icon class="w-5 h-5 text-gray-700" />
        <h2 class="text-lg md:text-xl font-semibold text-gray-900">Create Order</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
      <div class="lg:col-span-7 px-6 pb-6">
        <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold" style="color: #737376">Order Number:</span>
          <span class="text-sm" style="color: #171719">{{ orderNumber }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm font-bold" style="color: #737376">Date & Time:</span>
          <span class="text-sm" style="color: #171719">{{ dateTime }}</span>
        </div>

        <div>
          <label class="block text-sm font-bold mb-1.5" style="color: #737376">Name</label>
          <input
            v-model="formData.customerName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            style="color: #171719"
          />
        </div>

        <div>
          <label class="block text-sm font-bold mb-1.5" style="color: #737376">Contact</label>
          <input
            v-model="formData.contact"
            type="tel"
            @input="formatPhoneNumber"
            maxlength="16"
            placeholder="+90 555 555 5555"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            style="color: #171719"
          />
        </div>

        <div>
          <label class="block text-sm font-bold mb-1.5" style="color: #737376">Trans Type</label>
          <div class="flex gap-4">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="formData.transType"
                type="radio"
                value="Delivery"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-offset-0"
                style="color: #0B69FF; accent-color: #0B69FF;"
              />
              <span class="ml-2 text-sm font-bold" style="color: #171719">Delivery</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                v-model="formData.transType"
                type="radio"
                value="Takeaway"
                class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-offset-0"
                style="color: #0B69FF; accent-color: #0B69FF;"
              />
              <span class="ml-2 text-sm font-bold" style="color: #171719">Takeaway</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold mb-1.5" style="color: #737376">Message to Client</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            style="color: #171719"
          ></textarea>
        </div>

        <div class="relative dropdown-container">
          <label class="block text-sm font-bold mb-1.5" style="color: #737376">Order Items</label>
          <div class="relative">
            <button
              type="button"
              @click="dropdownOpen = !dropdownOpen"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between"
              style="color: #171719"
            >
              <span class="truncate">{{ formData.items.length > 0 ? formData.items.map(item => item.name).join(', ') : 'Select products' }}</span>
              <ChevronDownIcon class="w-5 h-5 transition-transform flex-shrink-0 ml-2" :class="{ 'rotate-180': dropdownOpen }" />
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              <div
                v-for="product in products"
                :key="product.id"
                @click="toggleProduct(product.id)"
                class="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    :checked="isProductSelected(product.id)"
                    class="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-0"
                    style="accent-color: #0B69FF;"
                    @click.stop
                  />
                  <div class="flex items-center justify-between flex-1">
                    <span class="text-sm font-bold" style="color: #171719">{{ product.name }}</span>
                    <span class="text-sm font-bold" style="color: #737376">${{ product.price }}</span>
                  </div>
                </div>
              </div>
              <div v-if="products.length === 0" class="px-3 py-2.5 text-sm" style="color: #737376">
                No products available
              </div>
            </div>
          </div>
        </div>

        <div v-if="formData.items.length > 0" class="mt-4 space-y-3">
          <div
            v-for="item in formData.items"
            :key="item.id"
            class="flex items-center justify-between px-4 py-3.5"
          >
            <div class="flex-1">
              <p class="text-sm font-bold" style="color: #171719">{{ item.name }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-bold" style="color: #737376">${{ item.price }}</span>
              <div class="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                <button
                  @click="decrementQuantity(item.id)"
                  class="w-9 h-9 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors"
                  :disabled="item.quantity <= 1"
                  :class="{ 'opacity-40 cursor-not-allowed hover:bg-gray-50': item.quantity <= 1 }"
                >
                  <MinusIcon class="w-4 h-4" />
                </button>
                <div class="w-14 h-9 flex items-center justify-center bg-white border-x border-gray-300">
                  <input
                    type="number"
                    :value="item.quantity"
                    @input="updateQuantity(item.id, $event)"
                    min="1"
                    class="w-full h-full text-center text-sm font-bold bg-transparent border-0 focus:outline-none focus:ring-0"
                    style="color: #171719"
                  />
                </div>
                <button
                  @click="incrementQuantity(item.id)"
                  class="w-9 h-9 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
              <button
                @click="removeItem(item.id)"
                class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div class="lg:col-span-5 px-6 pb-6 border-t lg:border-t-0 border-gray-300 relative">
        <div class="hidden lg:block absolute left-0 top-0 bottom-16 w-px bg-gray-300"></div>

        <div class="p-4" style="background-color: #F6F6F6; border-radius: 4px;">
          <h2 class="text-lg font-bold mb-4" style="color: #171719">Delivery Details</h2>

          <div class="grid grid-cols-12 gap-2 pb-2">
            <div class="col-span-6">
              <p class="text-xs font-bold" style="color: #737376">Order Item</p>
            </div>
            <div class="col-span-3 text-center">
              <p class="text-xs font-bold" style="color: #737376">Number</p>
            </div>
            <div class="col-span-3 text-right">
              <p class="text-xs font-bold" style="color: #737376">Cost</p>
            </div>
          </div>

          <div v-if="formData.items.length > 0" class="space-y-3 mt-3">
            <div
              v-for="item in formData.items"
              :key="item.id"
              class="grid grid-cols-12 gap-2"
            >
              <div class="col-span-6">
                <p class="text-sm font-bold truncate" style="color: #171719">{{ item.name }}</p>
              </div>
              <div class="col-span-3 text-center">
                <p class="text-sm font-bold" style="color: #171719">{{ item.quantity }}</p>
              </div>
              <div class="col-span-3 text-right">
                <p class="text-sm font-bold" style="color: #171719">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <div v-else class="py-8 text-center">
            <p class="text-sm" style="color: #737376">No items selected</p>
          </div>
        </div>

      <div class="mt-4 p-4" style="background-color: #F6F6F6; border-radius: 4px;">
        <div class="flex justify-between items-center">
          <p class="text-sm font-bold" style="color: #737376">Total Amount</p>
          <p class="text-lg font-bold" style="color: #171719">${{ totalAmount.toFixed(2) }}</p>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="handleCancel"
          class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleAddOrder"
          :disabled="!canSubmit"
          class="flex-1 px-4 py-2.5 text-white text-sm font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          :style="canSubmit ? 'background-color: #0DC74E' : ''"
          :class="canSubmit ? 'hover:opacity-90' : ''"
        >
          Add Order
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, ChevronDownIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '~/stores/orders'
import type { Product, OrderItem } from '~/types'

const ordersStore = useOrdersStore()
const emit = defineEmits<{
  orderCreated: []
  cancel: []
}>()

const formData = reactive({
  customerName: '',
  contact: '',
  transType: 'Delivery' as 'Delivery' | 'Takeaway',
  notes: '',
  items: [] as OrderItem[]
})

const orderNumber = computed(() => {
  const timestamp = Date.now().toString().slice(-6)
  return `#${timestamp}`
})

const dateTime = computed(() => {
  const now = new Date()
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${date} ${time}`
})

const products = ref<Product[]>([])
const dropdownOpen = ref(false)

const fetchProducts = async () => {
  try {
    const data = await $fetch<Product[]>('/api/products')
    products.value = data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.dropdown-container')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  fetchProducts()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleProduct = (productId: string) => {
  const existingIndex = formData.items.findIndex(i => i.id === productId)
  if (existingIndex > -1) {
    formData.items.splice(existingIndex, 1)
  } else {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      formData.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    }
  }
}

const isProductSelected = (productId: string) => {
  return formData.items.some(i => i.id === productId)
}
const incrementQuantity = (itemId: string) => {
  const item = formData.items.find(i => i.id === itemId)
  if (item) item.quantity++
}

const decrementQuantity = (itemId: string) => {
  const item = formData.items.find(i => i.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

const updateQuantity = (itemId: string, event: Event) => {
  const item = formData.items.find(i => i.id === itemId)
  const value = parseInt((event.target as HTMLInputElement).value)
  if (item && value >= 1) {
    item.quantity = value
  }
}

const removeItem = (itemId: string) => {
  const index = formData.items.findIndex(i => i.id === itemId)
  if (index > -1) {
    formData.items.splice(index, 1)
  }
}

const totalAmount = computed(() => {
  return formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const canSubmit = computed(() => {
  return formData.customerName.trim() !== '' &&
         formData.contact.trim() !== '' &&
         formData.items.length > 0
})

const handleAddOrder = () => {
  if (!canSubmit.value) return

  const newOrder = {
    id: `order-${Date.now()}`,
    orderNumber: orderNumber.value,
    dateTime: dateTime.value,
    customerName: formData.customerName,
    contact: formData.contact,
    transType: formData.transType,
    amount: totalAmount.value,
    items: [...formData.items],
    notes: formData.notes || '-',
    status: 'accepted' as const
  }

  ordersStore.addOrder(newOrder)

  formData.customerName = ''
  formData.contact = ''
  formData.transType = 'Delivery'
  formData.notes = ''
  formData.items = []

  emit('orderCreated')
}

const formatPhoneNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')

  if (!value.startsWith('90')) {
    value = '90' + value
  }

  if (value.length > 12) {
    value = value.slice(0, 12)
  }

  let formatted = '+90'
  if (value.length > 2) {
    formatted += ' ' + value.slice(2, 5)
  }
  if (value.length > 5) {
    formatted += ' ' + value.slice(5, 8)
  }
  if (value.length > 8) {
    formatted += ' ' + value.slice(8, 12)
  }

  formData.contact = formatted
}

const handleCancel = () => {
  emit('cancel')
}
</script>
