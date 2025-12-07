<template>
  <div class="bg-white border border-gray-300 rounded-md overflow-hidden">
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 p-4">
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 flex-1">
        <div class="min-w-0">
          <p class="text-xs mb-0.5 text-brand-gray">Order number</p>
          <p class="text-sm font-bold truncate text-brand-dark">{{ order.orderNumber }}</p>
        </div>
        <div class="min-w-0">
          <p class="text-xs mb-0.5 text-brand-gray">Date & Time</p>
          <p class="text-sm font-bold truncate text-brand-dark">{{ order.dateTime }}</p>
        </div>
        <div class="min-w-0">
          <p class="text-xs mb-0.5 text-brand-gray">Name</p>
          <p class="text-sm font-bold truncate text-brand-dark">{{ order.customerName }}</p>
        </div>
        <div class="min-w-0">
          <p class="text-xs mb-0.5 text-brand-gray">Contact</p>
          <p class="text-sm font-bold truncate text-brand-dark">{{ order.contact }}</p>
        </div>
        <div class="min-w-0">
          <p class="text-xs mb-0.5 text-brand-gray">Trans Type</p>
          <span
            class="inline-block px-2 py-1 text-xs font-bold rounded whitespace-nowrap text-white"
            :class="order.transType === 'Delivery' ? 'bg-brand-delivery' : 'bg-brand-takeaway'"
          >
            {{ order.transType }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div class="text-right">
          <p class="text-xs mb-0.5 text-brand-gray">Amount</p>
          <span class="text-sm font-bold text-brand-dark">${{ order.amount }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 px-4 py-3">
      <p class="text-xs whitespace-nowrap text-brand-gray">Ordered Items</p>
      <div class="flex gap-1.5 flex-wrap flex-1">
        <span
          v-for="(item, index) in order.items"
          :key="index"
          class="px-2.5 py-1 text-xs sm:text-sm font-bold rounded bg-brand-item-bg text-brand-dark"
        >
          {{ item.name }} × {{ item.quantity }}
        </span>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3">
      <div class="flex-1 min-w-0">
        <p class="text-xs mb-1 text-brand-gray">Additional information from customer</p>
        <p class="text-sm font-bold text-brand-dark">{{ order.notes || '-' }}</p>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button class="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors">
          <PrinterIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>
        <button
          v-if="nextStatusText"
          @click="$emit('moveToNext', order.id)"
          class="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          {{ nextStatusText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrinterIcon } from '@heroicons/vue/24/outline'
import type { Order, OrderStatus } from '~/types'

interface Props {
  order: Order
}

const props = defineProps<Props>()
const emit = defineEmits<{
  moveToNext: [orderId: string]
}>()

const nextStatusText = computed(() => {
  switch (props.order.status) {
    case 'accepted':
      return 'Move to Cooking'
    case 'cooking':
      return 'Mark as Ready'
    case 'parcel-ready':
      return 'Mark as Delivered'
    case 'delivered':
      return 'Complete Order'
    case 'completed':
      return null
    default:
      return null
  }
})
</script>
