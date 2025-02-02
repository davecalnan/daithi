<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');

Route::redirect('/login', config('app.url').'/admin/login')
    ->name('login');
