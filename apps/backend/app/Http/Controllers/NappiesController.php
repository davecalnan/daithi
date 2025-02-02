<?php

namespace App\Http\Controllers;

use App\Data\CreateNappyData;
use App\Data\NappyData;
use App\Models\Nappy;

class NappiesController extends Controller
{
    public function index()
    {
        return NappyData::collect(
            Nappy::query()
                ->orderBy('changed_at', 'desc')
                ->paginateAsRequested()
        );
    }

    public function store(CreateNappyData $data)
    {
        $attributes = $data->validated();

        $attributes['changed_at'] ??= now();

        return NappyData::from(
            Nappy::create($attributes)
        );
    }
}
