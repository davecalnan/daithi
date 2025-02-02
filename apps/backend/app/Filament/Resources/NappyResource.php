<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NappyResource\Pages;
use App\Models\Nappy;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

class NappyResource extends Resource
{
    protected static ?string $model = Nappy::class;

    protected static ?string $navigationIcon = 'icon-baby-changing-station';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                DateTimePicker::make('changed_at')
                    ->default(now()),
                Fieldset::make('Contents')
                    ->schema([
                        Checkbox::make('is_wet'),
                        Checkbox::make('is_dirty'),
                    ])
                    ->columnSpan(1),
                Textarea::make('notes'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('day')
                    ->label('Day')
                    ->state(fn (Nappy $record) => match (true) {
                        $record->changed_at->isToday() => 'Today',
                        $record->changed_at->isYesterday() => 'Yesterday',
                        default => "{$record->changed_at->format('F jS')} ({$record->changed_at->diffForHumans()})",
                    }),
                TextColumn::make('changed_at')
                    ->dateTime('H:i')
                    ->dateTimeTooltip(),
                IconColumn::make('is_wet')
                    ->icon(fn (bool $state) => $state
                        ? 'heroicon-o-check-circle'
                        : 'heroicon-o-x-circle'
                    )
                    ->color(fn (bool $state) => $state
                        ? 'success'
                        : 'gray'
                    ),
                IconColumn::make('is_dirty')
                    ->icon(fn (bool $state) => $state
                        ? 'heroicon-o-check-circle'
                        : 'heroicon-o-x-circle'
                    )
                    ->color(fn (bool $state) => $state
                        ? 'success'
                        : 'gray'
                    ),
                TextColumn::make('notes')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();

                        if (strlen($state) <= $column->getCharacterLimit()) {
                            return null;
                        }

                        // Only render the tooltip if the column content exceeds the length limit.
                        return $state;
                    }),
            ])
            ->filters([
                Filter::make('is_wet'),
                Filter::make('is_dirty'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('changed_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNappies::route('/'),
            'create' => Pages\CreateNappy::route('/create'),
            'edit' => Pages\EditNappy::route('/{record}/edit'),
        ];
    }
}
