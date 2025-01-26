<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\NappiesController;
use Illuminate\Support\Facades\Route;

Route::withoutMiddleware('auth:sanctum')
    ->group(function () {
        Route::post('login', LoginController::class);
    });

Route::apiResource('nappies', NappiesController::class)->only(['index', 'store']);
