<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nappy extends Model
{
    /** @use HasFactory<\Database\Factories\NappyFactory> */
    use HasFactory;

    protected $casts = [
        'changed_at' => 'datetime',
    ];
}
