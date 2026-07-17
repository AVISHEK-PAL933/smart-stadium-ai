# API Documentation

The current application utilizes a mock data layer to simulate API responses for Hackathon presentation purposes.

## Simulated Endpoints
The `/services` directory exposes the following TypeScript interfaces simulating REST API calls:

- `fetchMatchStats()`: Returns live possession, score, and cards.
- `fetchFoodMenu()`: Returns categorized concessions.
- `submitOrder(cart)`: Simulates POST order creation.
- `fetchNavRoute(dest)`: Simulates pathfinding algorithm for AR routing.

## Future Implementation
In a true production environment, these services will be connected via React Query or Redux Toolkit to backend microservices (Node/Python) streaming data over WebSockets (for live match stats/IoT data) and standard REST endpoints for CRUD operations.
