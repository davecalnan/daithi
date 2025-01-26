<?php

namespace App\Http\Controllers;

use App\Data\NappyData;
use App\Models\Nappy;
use Illuminate\Http\Request;

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

    public function store(NappyData $data)
    {
        return NappyData::from(
            Nappy::create($data->validated())
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
