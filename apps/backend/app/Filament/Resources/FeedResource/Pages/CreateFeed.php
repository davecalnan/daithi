<?php

namespace App\Filament\Resources\FeedResource\Pages;

use App\Filament\Resources\FeedResource;
use Filament\Resources\Pages\CreateRecord;

class CreateFeed extends CreateRecord
{
    protected static string $resource = FeedResource::class;

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
