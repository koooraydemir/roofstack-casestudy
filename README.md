# RoofStack Restaurant Order Management System

A modern, responsive restaurant order management dashboard built with Nuxt 4, Vue 3, and Firebase. This application provides real-time order tracking, multi-status management, and an intuitive interface for restaurant staff.

## Live Demo

🚀 **[View Live Demo](https://roofstack-casestudy.vercel.app/)**

The application is deployed on Vercel and available for testing.

## Features

### Order Management
- **Multi-Status Tracking**: Track orders through their complete lifecycle
  - New Order → Accepted → Cooking → Parcel Ready → Delivered → Completed
- **Real-time Updates**: Orders are sorted with newest first
- **Order Creation**: Easy-to-use form for creating new orders
- **Order Details**: View comprehensive order information including items, customer details, and notes

### User Interface
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Clean Navigation**: Sidebar navigation with Orders, Menu, and Settings pages
- **Status Filters**: Quick access to orders by status with live counts
- **Interactive Cards**: Order cards with action buttons for status progression

### Technical Features
- **TypeScript**: Full type safety across the application
- **State Management**: Pinia store for centralized state management
- **Performance Optimized**: Efficient sorting, computed values, and memory leak prevention
- **Unit Tested**: Comprehensive test coverage with Vitest
- **Firebase Integration**: Backend powered by Firebase Firestore

## Tech Stack

### Frontend
- **Nuxt 4** - Full-stack framework with App Router
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons

### State Management & Backend
- **Pinia** - Vue store with intuitive API
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Auth** - Authentication service

### Development Tools
- **Vitest** - Fast unit testing framework
- **Happy DOM** - Testing environment
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformation

## Project Structure

```
roofstack-casestudy/
├── assets/
│   ├── css/
│   │   └── main.css           # Global styles and Tailwind directives
│   └── images/
│       └── logo.png            # Application logo
├── components/
│   ├── NewOrderForm.vue        # Order creation form
│   └── OrderCard.vue           # Order display card
├── composables/
│   └── useProducts.ts          # Product management composable
├── layouts/
│   └── default.vue             # Main layout with navigation
├── pages/
│   ├── index.vue               # Landing page (redirects to orders)
│   ├── orders.vue              # Order management page
│   ├── menu.vue                # Menu management page
│   └── settings.vue            # Settings page
├── plugins/
│   └── firebase.client.ts      # Firebase initialization
├── server/
│   └── api/
│       └── products.ts         # Products API endpoint
├── stores/
│   └── orders.ts               # Orders Pinia store
├── tests/
│   └── unit/
│       └── orders.spec.ts      # Unit tests for orders store
├── types/
│   └── index.ts                # TypeScript type definitions
└── nuxt.config.ts              # Nuxt configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase project (for backend features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/koooraydemir/roofstack-casestudy.git
cd roofstack-casestudy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure Firebase credentials in `.env`:
```env
NUXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NUXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed Firebase configuration instructions.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Testing

Run unit tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm test
```

Run tests once:
```bash
npm run test:run
```

## Configuration

### Tailwind CSS

Custom brand colors are defined in `tailwind.config.ts`:

- `brand-gray`: #737376
- `brand-dark`: #171719
- `brand-bg`: #EDEDED
- `brand-light-bg`: #F6F6F6
- `brand-item-bg`: #E0E0E0
- `brand-delivery`: #2A71FA
- `brand-takeaway`: #FC7501
- `brand-success`: #0DC74E

### TypeScript

TypeScript configuration is in `tsconfig.json` with strict type checking disabled for rapid development. The project uses type definitions from `types/index.ts`.

## Key Components

### Orders Store (`stores/orders.ts`)
Manages order state with actions and getters:
- `getOrdersByStatus(status)`: Filter and sort orders by status
- `getOrderCount(status)`: Count orders in a specific status
- `moveOrderToNextStatus(orderId)`: Progress order to next status
- `addOrder(order)`: Add new order to the system

### NewOrderForm Component
- Dynamic product selection
- Real-time total calculation
- Form validation
- Order number generation
- Date/time stamping

### OrderCard Component
- Displays order details
- Status-based action buttons
- Print functionality
- Responsive grid layout

## Performance Optimizations

- Computed values for reactive calculations
- Proper event listener cleanup
- Efficient sorting algorithms
- Timestamp-based order sorting
- Memory leak prevention

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is private and proprietary.

## Author

Koray Demir

## Acknowledgments

Built as a case study for RoofStack recruitment process.
