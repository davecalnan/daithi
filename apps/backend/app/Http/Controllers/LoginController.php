<?php

namespace App\Http\Controllers;

use App\Data\LoginData;
use App\Models\User;

class LoginController extends Controller
{
    public function __invoke(LoginData $data)
    {
        if (! auth()->attempt($data->validated())) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        /** @var User */
        $user = auth('sanctum')->user();

        return [
            'user' => $user,
            'token' => $user->createToken('App API Token')->plainTextToken,
        ];
    }
}
