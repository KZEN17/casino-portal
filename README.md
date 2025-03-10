# Casino Portal Application

A modern, scalable, and modular casino game portal built with Next.js and React. This application supports multiple markets, themes, and casino brands.

## Project Overview

This project implements a casino portal with the following features:

- Multiple market support (English and Canadian)
- User authentication and market-specific routing
- Light/dark theme support with market-specific styling
- Casino game lobby with filtering, sorting, and pagination
- Game details pages with conditional UI based on login status
- User profile management

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Redux Toolkit (RTK)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Next.js App Router
- **Authentication**: JWT-based with cookie storage
- **Testing**: Jest

## Project Structure

```
src/
├── app/
│   ├── [marketId]/         # Dynamic routes for markets (en/ca)
│   │   ├── casino/         # Casino games lobby
│   │   │   └── [slug]/     # Individual game pages
│   │   ├── my-profile/     # User profile settings
│   │   └── page.tsx        # Market-specific landing page
│   ├── login/              # Login page
│   ├── components/         # Shared components
│   │   ├── auth/           # Authentication components
│   │   ├── casino/         # Casino-specific components
│   │   ├── common/         # Common UI components
│   │   ├── games/          # Game-related components
│   │   ├── layouts/        # Layout components
│   │   └── profile/        # Profile-related components
│   ├── data/               # Data sources (users, games)
│   ├── providers/          # Context providers
│   ├── store/              # Redux store
│   │   └── slices/         # Redux slices
│   ├── utils/              # Utility functions
│   ├── constants.ts        # Application constants
│   ├── middleware.ts       # Next.js middleware for routing
│   └── types.ts            # TypeScript types
```

## Features

### Authentication System

- Simple JSON-based user authentication
- Market-specific user accounts (en/ca)
- Middleware to prevent market switching
- Protected routes requiring authentication

### Theming System

- Light and dark mode support
- Market-specific color schemes (blue for English, red for Canadian)
- Theme toggle in the navigation bar
- Theme persistence using localStorage
- CSS variables for consistent styling

### Casino Games Lobby

- Game card grid with responsive layout
- Advanced filtering by provider, category, and game features
- Search functionality
- Sorting options (name, provider, category)
- Pagination for large datasets

### Game Details Page

- Individual game page for each game
- Responsive layout with game thumbnail and details
- "Play for Real" button for logged-in users
- "Play for Free" button for logged-out users
- Game metadata and features display

### User Profile

- View and edit user profile information
- Update first name and last name
- Success notification after profile update
- Market-specific preferences

### Loading States

- Consistent loading indicators throughout the application
- Full-page loaders for route transitions
- Component-level loading states
- Error state handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/casino-portal.git
cd casino-portal

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=your-api-url
```

### Build for Production

```bash
npm run build
npm start
```

## Styling Approach

This project uses Tailwind CSS with CSS variables for theming, which provides several advantages:

1. **Consistent Theme Variables**: CSS variables allow for easy theme switching
2. **Market-Specific Styling**: Different color schemes for each market
3. **Dark/Light Mode**: Seamless switching between light and dark themes
4. **Component-Based Design**: Utility classes make components modular and reusable
5. **Minimal CSS Footprint**: Only the CSS actually used is included in the bundle

The theming system is implemented through CSS variables defined in globals.css and applied via the ThemeProvider component.

## Testing

The application includes comprehensive tests using Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

- **TypeScript**: Strong typing for better developer experience and fewer bugs
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## Future Improvements

- Implement TanStack Query for data fetching
- Add IndexedDB for offline game data support
- Add WebSocket support for real-time updates
- Implement feature flags for market-specific features
- Add Docker support for easier deployment
- Expand test coverage with more component tests

## License

This project is licensed under the MIT License.