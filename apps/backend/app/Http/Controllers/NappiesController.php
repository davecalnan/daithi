<?php

namespace App\Http\Controllers;

use App\Data\CreateNappyData;
use App\Data\NappyData;
use App\Models\Nappy;
use Illuminate\Http\Request;
use Spatie\LaravelData\Optional;

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

        if ($attributes['changed_at'] instanceof Optional) {
            $attributes['changed_at'] = now();
        }

        return NappyData::from(
            Nappy::create($attributes)
        );
    }

    public function show(Nappy $nappy)
    {
        //
    }

    public function update(Request $request, Nappy $nappy)
    {
        //
    }

    public function destroy(Nappy $nappy)
    {
        //
    }
}
