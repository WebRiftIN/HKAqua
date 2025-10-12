# AquaPure Admin Panel

This is the admin panel for AquaPure water purifier business, built with React and Tailwind CSS.

## Features

- **Dashboard**: Comprehensive overview with statistics cards, recent orders, messages, and services
- **Add Product**: Complete form for adding new water purifier products with image upload
- **Product List**: Table view of all products with edit/delete actions
- **Reviews**: Customer reviews management with star ratings
- **Order Management**: Track and manage customer orders
- **Contact Messages**: View and respond to customer inquiries
- **Services Management**: Manage installation and maintenance services
- **User Management**: Admin, manager, and staff user management
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with water-themed colors

## Components Structure

```
src/
├── components/
│   ├── AddProduct/
│   │   ├── AddProduct.jsx     # Main product form component
│   │   └── index.js           # Export file
│   ├── Dashboard/
│   │   ├── Dashboard.jsx      # Dashboard statistics and overview
│   │   └── index.js           # Export file
│   ├── Header.jsx             # Top header component
│   └── Sidebar.jsx            # Navigation sidebar with new design
├── Pages/
│   ├── AddProduct.jsx         # Add Product page
│   ├── Dashboard.jsx          # Dashboard page
│   ├── ProductList.jsx        # Product list management
│   ├── Reviews.jsx            # Customer reviews
│   ├── OrderReceived.jsx      # Order management
│   ├── ContactPage.jsx        # Contact messages
│   ├── ServicesPage.jsx       # Services management
│   └── Users.jsx              # User management
├── App.jsx                    # Main app component with routing
└── index.css                  # Tailwind CSS with custom styles
```

## Key Features of Add Product Form

- Image upload with preview
- Product information (name, category)
- Pricing (discounted and original price)
- Detailed description
- Product specifications (4 fields)
- Product status checkboxes
- Form validation
- Loading states
- Success feedback

## Navigation

The sidebar includes:
- Dashboard
- Add Product
- Product List
- Reviews
- Order Received
- Contact Page
- Services Page
- Users
- Logout

## Mobile Support

- Responsive sidebar with mobile menu button
- Touch-friendly interface
- Mobile overlay for sidebar
- Optimized form layout for small screens
- Responsive tables with horizontal scrolling
- Mobile-optimized card layouts

## Dashboard Features

- **Statistics Cards**: Sales, orders, services, and contact metrics with growth indicators
- **Recent Orders**: Quick view of latest orders with status indicators
- **Recent Messages**: Customer inquiries and contact messages
- **Services Overview**: Table of available services with pricing and status
- **Hover Effects**: Interactive cards with smooth animations

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Customization

### Colors
The app uses a water-themed color palette:
- Primary: Sky blue (#0EA5E9)
- Secondary: Deep water (#0284C7)
- Gradient: Sky blue to light blue (#0ea5e9 to #38bdf8 to #0284c7)
- Light: Water mist (#F0F9FF)

### Adding New Pages
1. Create component in `src/Pages/`
2. Add route in `App.jsx` renderCurrentPage function
3. Add navigation item in `Sidebar.jsx`

## Form Handling

The Add Product form includes:
- Controlled inputs with React state
- File upload with preview
- Form validation
- Loading states during submission
- Success/error feedback

## Technologies Used

- React 19
- Tailwind CSS 4
- Vite (build tool)
- Modern JavaScript (ES6+)
