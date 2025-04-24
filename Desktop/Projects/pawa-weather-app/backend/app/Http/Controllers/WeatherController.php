<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    public function getWeather($city)
    {
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Weather data not found'], 404);
        }

        return $response->json();
    }

    public function getForecast($city)
    {
        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'appid' => $this->apiKey,
            'units' => 'metric',
            'cnt' => 5
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Forecast data not found'], 404);
        }

        return $response->json();
    }
}
