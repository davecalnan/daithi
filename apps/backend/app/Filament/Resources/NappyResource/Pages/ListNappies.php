<?php

namespace App\Filament\Resources\NappyResource\Pages;

use App\Filament\Resources\NappyResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNappies extends ListRecords
{
    protected static string $resource = NappyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
