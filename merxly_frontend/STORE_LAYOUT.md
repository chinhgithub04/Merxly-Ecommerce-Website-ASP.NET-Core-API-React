# Store Owner Layout - Implementation Guide

## Overview

A complete Shopify-style store management layout for users with the "StoreOwner" role. The layout includes a fixed header, sidebar navigation, and protected routing.

## Components Created

### 1. Layout Components

- **StoreOwnerLayout** (`components/layout/StoreOwnerLayout.tsx`)

  - Main layout wrapper combining header and sidebar
  - Uses React Router's `<Outlet />` for nested routes
  - Fixed positioning with proper spacing

- **StoreHeader** (`components/layout/StoreHeader.tsx`)

  - Fixed top header (height: 64px)
  - Logo on the left
  - Search bar in the center
  - Notification icon with badge on the right
  - Uses Heroicons for icons

- **StoreSidebar** (`components/layout/StoreSidebar.tsx`)
  - Fixed left sidebar (width: 256px)
  - Navigation menu with active states
  - Logout button at the bottom
  - Icons for each menu item

### 2. Protected Route Component

- **ProtectedRoute** (`components/ProtectedRoute.tsx`)
  - Checks authentication status
  - Validates user roles
  - Redirects unauthenticated users to login
  - Shows 403 page for unauthorized access

### 3. Store Pages (Placeholders)

- **StoreHomePage** - Dashboard overview
- **StoreOrdersPage** - Order management
- **StoreProductsPage** - Product management
- **StoreSettingsPage** - Store settings

### 4. Type Definitions

- **UserRole** (`types/enums/UserRole.ts`)
  - Type-safe user role constants
  - Matches backend roles (Admin, Customer, StoreOwner)

## Routing Structure

```
/store (Protected - StoreOwner only)
  ├── / (Home/Dashboard)
  ├── /orders
  ├── /products
  └── /settings
```

## Layout Structure

```
┌─────────────────────────────────────────────┐
│  HEADER (Fixed)                             │
│  [Logo]  [Search Bar]  [Notification]       │
└─────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────┐
│ SIDEBAR  │                                  │
│ (Fixed)  │  MAIN CONTENT AREA               │
│          │  (Scrollable)                    │
│ • Home   │                                  │
│ • Orders │                                  │
│ • Product│                                  │
│ • Setting│                                  │
│          │                                  │
│ [Logout] │                                  │
└──────────┴──────────────────────────────────┘
```

## Features

### Authentication & Authorization

- Only users with "StoreOwner" role can access `/store` routes
- Automatic redirect to login for unauthenticated users
- 403 error page for authenticated users without proper role

### Navigation

- Active state highlighting (primary color background)
- Smooth hover transitions
- Icon + text labels for clarity
- Persistent across page changes

### Responsive Design

- Fixed header stays at top while scrolling
- Fixed sidebar for easy navigation
- Main content area scrolls independently
- Proper spacing and padding throughout

### Visual Design

- Uses the custom Tailwind theme (primary, secondary, neutral colors)
- Public Sans font family
- Consistent spacing and sizing
- Hover and active states for interactive elements

## Usage

### Accessing the Store Dashboard

1. Login with a user account that has "StoreOwner" role
2. Navigate to `/store`
3. Use sidebar to navigate between different sections

### Adding New Pages

```tsx
// 1. Create new page component
export const StoreNewPage = () => {
  return <div>New Page Content</div>;
};

// 2. Add route in App.tsx
<Route path='new-page' element={<StoreNewPage />} />

// 3. Add navigation item in StoreSidebar.tsx
{ name: 'New Page', path: '/store/new-page', icon: IconComponent }
```

## Technical Details

### Dependencies Used

- `@heroicons/react` - Icons for UI
- `react-router-dom` - Routing and navigation
- Custom theme colors from Tailwind

### Layout Measurements

- Header height: `64px` (h-16)
- Sidebar width: `256px` (w-64)
- Main content padding: `32px` (p-8)
- Top offset for content: `pt-16 + pl-64`

### Color Usage

- **Primary-600/700**: Active navigation, links, logo
- **Neutral-50**: Page background
- **Neutral-100**: Hover states
- **Neutral-200**: Borders
- **Neutral-700/900**: Text colors
- **Error-500**: Notification badge

## Future Enhancements

- Add mobile responsive sidebar (hamburger menu)
- Implement notification dropdown
- Add search functionality
- Create breadcrumbs for nested pages
- Add user profile dropdown
- Implement real-time notifications
- Add keyboard shortcuts for navigation
