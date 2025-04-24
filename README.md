# Weather App

This is a weather app built using Next.js (with TypeScript) for the frontend, Laravel for the backend, and RippleUI for the user interface. The app integrates with the OpenWeatherMap API to fetch weather data based on user input (location).

## Tech Stack

- **Frontend**: Next.js, TypeScript, RippleUI
- **Backend**: Laravel (PHP)
- **API Integration**: OpenWeatherMap API
- **Deployment**: To be determined (could be deployed using services like Vercel for frontend and Heroku for backend, etc.)

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (for frontend development)
- Composer (for Laravel)
- PHP (for Laravel)
- MySQL or any other database setup for Laravel
- OpenWeatherMap API Key (you can get one from [OpenWeatherMap](https://openweathermap.org/))

### Backend (Laravel Setup)

1. Clone the repository to your local machine.
2. Navigate to the `backend/` directory.
3. Install dependencies:

   ```bash
   composer install
   ```

4. Set up your `.env` file for database and API key configuration:

   - Set your database connection.
   - Set the OpenWeatherMap API key in the `.env` file:

   ```dotenv
   OPENWEATHERMAP_API_KEY=your-api-key-here
   ```

5. Run the migrations to set up your database (if needed):

   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:

   ```bash
   php artisan serve
   ```

   The backend should now be running at `http://127.0.0.1:8000`.

### Frontend (Next.js Setup)

1. Clone the repository to your local machine (or navigate to the frontend directory if you already have it set up).
2. Navigate to the `frontend/` directory.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the OpenWeatherMap API URL in the frontend:

   ```js
   const apiURL = 'http://127.0.0.1:8000/api/weather';  // Replace with the actual backend URL
   ```

5. Run the Next.js development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running at `http://localhost:3000`.

## Features

- **Weather Data**: The app fetches real-time weather data based on the location input by the user.
- **UI**: Built with RippleUI to provide a smooth and modern user interface.

## Future Enhancements

- **Location-based Weather**: Add functionality to fetch weather data based on the user's current location (using Geolocation API).
- **Weather Forecast**: Extend the functionality to show a 7-day weather forecast.
