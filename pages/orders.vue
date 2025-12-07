<template>
  <div class="flex flex-col md:flex-row h-full">
    <aside class="w-full md:w-52 border-b md:border-b-0 md:border-r border-gray-200 bg-brand-light-bg">
      <div class="p-3 md:p-4 border-b border-gray-200">
        <h2 class="text-base md:text-lg font-semibold text-gray-900">Orders</h2>
      </div>

      <nav class="p-2 md:p-3 flex md:flex-col overflow-x-auto md:overflow-x-visible">
        <button
          @click="currentStatus = 'new'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium mb-0 md:mb-1 mr-2 md:mr-0 whitespace-nowrap"
          :class="currentStatus === 'new' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>New Order</span>
        </button>

        <button
          @click="currentStatus = 'accepted'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium mb-0 md:mb-1 mr-2 md:mr-0 whitespace-nowrap"
          :class="currentStatus === 'accepted' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>Accepted</span>
          <span class="text-xs ml-2 text-brand-count">
            {{ ordersStore.getOrderCount('accepted') }}
          </span>
        </button>

        <button
          @click="currentStatus = 'cooking'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium mb-0 md:mb-1 mr-2 md:mr-0 whitespace-nowrap"
          :class="currentStatus === 'cooking' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>Cooking</span>
          <span class="text-xs ml-2 text-brand-count">
            {{ ordersStore.getOrderCount('cooking') }}
          </span>
        </button>

        <button
          @click="currentStatus = 'parcel-ready'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium mb-0 md:mb-1 mr-2 md:mr-0 whitespace-nowrap"
          :class="currentStatus === 'parcel-ready' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>Parcel Ready</span>
          <span class="text-xs ml-2 text-brand-count">
            {{ ordersStore.getOrderCount('parcel-ready') }}
          </span>
        </button>

        <button
          @click="currentStatus = 'delivered'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium mb-0 md:mb-1 mr-2 md:mr-0 whitespace-nowrap"
          :class="currentStatus === 'delivered' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>Delivered</span>
          <span class="text-xs ml-2 text-brand-count">
            {{ ordersStore.getOrderCount('delivered') }}
          </span>
        </button>

        <button
          @click="currentStatus = 'completed'"
          class="flex-shrink-0 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
          :class="currentStatus === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
        >
          <span>Completed</span>
          <span class="text-xs ml-2 text-brand-count">
            {{ ordersStore.getOrderCount('completed') }}
          </span>
        </button>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col min-h-0 bg-white">
      <div v-if="currentStatus !== 'new'" class="px-4 md:px-6 py-3 md:py-4">
        <h1 class="text-lg md:text-xl font-semibold text-gray-900 capitalize mb-3">{{ currentStatus.replace('-', ' ') }}</h1>
        <div class="flex items-center justify-between">
          <div class="inline-flex items-center gap-2 px-3 py-2 rounded bg-brand-light-bg">
            <Bars3Icon class="w-4 h-4 text-brand-dark" />
            <span class="text-sm font-bold text-brand-dark">Showing {{ currentOrders.length }} Orders</span>
          </div>
          <button
            @click="currentStatus = 'new'"
            class="px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            Add New Order
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-auto" :class="currentStatus !== 'new' ? 'px-4 md:px-6 pb-4 md:pb-6' : ''">
        <div v-if="currentStatus === 'new'">
          <NewOrderForm @order-created="handleOrderCreated" @cancel="handleCancel" />
        </div>

        <template v-else>
          <div v-if="currentOrders.length > 0" class="space-y-4">
            <OrderCard
              v-for="order in currentOrders"
              :key="order.id"
              :order="order"
              @move-to-next="handleMoveToNext"
            />
          </div>

          <div v-else class="flex flex-col items-center justify-center h-64 text-center">
            <div class="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <DocumentTextIcon class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-900 font-semibold text-lg mb-1">No orders yet</p>
            <p class="text-gray-500 text-sm mb-4">There are no {{ currentStatus.replace('-', ' ') }} orders at the moment</p>
            <button
              @click="currentStatus = 'new'"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '~/stores/orders'
import type { OrderStatus } from '~/types'

const ordersStore = useOrdersStore()
const currentStatus = ref<OrderStatus | 'new'>('accepted')

const currentOrders = computed(() => {
  if (currentStatus.value === 'new') return []
  return ordersStore.getOrdersByStatus(currentStatus.value as OrderStatus)
})

const handleMoveToNext = (orderId: string) => {
  ordersStore.moveOrderToNextStatus(orderId)
}

const handleOrderCreated = () => {
  currentStatus.value = 'accepted'
}

const handleCancel = () => {
  currentStatus.value = 'accepted'
}
</script>
