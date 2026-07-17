# Architecture

Smart Stadium AI is built using a highly modular, feature-first architecture pattern in React Native using Expo Router.

## Core Concepts
- **Feature Modules**: Each major application domain (e.g., `executive-analytics`, `food-ordering`) exists as an independent screen module in `app/(modules)/`.
- **Dumb Components**: UI elements located in `components/` rely on props for their data, isolating business logic.
- **Glassmorphism Theme**: The entire app utilizes a custom `GlassCard` wrapper and global `Colors` and `Theme` constants to ensure a uniform premium dark mode.
- **Zero-Dependency Animations**: We strictly rely on `react-native-reanimated` and `react-native-svg` for performance-critical UI, bypassing bulky third-party libraries (especially for charts).

## State Management
State is managed locally within the top-level Screen modules and drilled down into components, supplemented by React Context where global state is necessary. Mock data is isolated in the `/data` directory to ensure clean component testing.
