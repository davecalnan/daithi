<?php

namespace App\Filament\Resources\NappyResource\Pages;

use App\Filament\Resources\NappyResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditNappy extends EditRecord
{
    protected static string $resource = NappyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
