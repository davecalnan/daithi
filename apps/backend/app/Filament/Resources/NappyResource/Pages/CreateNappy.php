<?php

namespace App\Filament\Resources\NappyResource\Pages;

use App\Filament\Resources\NappyResource;
use Filament\Resources\Pages\CreateRecord;

class CreateNappy extends CreateRecord
{
    protected static string $resource = NappyResource::class;

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
