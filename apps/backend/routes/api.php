<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\NappiesController;
use Illuminate\Support\Facades\Route;

Route::withoutMiddleware('auth:sanctum')
    ->group(function () {
        Route::get('/', function () {
            return response()->json(
                data: 'Daithí API',
                options: JSON_UNESCAPED_UNICODE
            );
        });

        Route::post('login', LoginController::class);
    });

Route::apiResource('nappies', NappiesController::class)->only(['index', 'store']);
