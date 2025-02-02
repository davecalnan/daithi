<?php

namespace App\Filament\Resources;

use App\Data\FeedSource;
use App\Data\FoodType;
use App\Filament\Resources\FeedResource\Pages;
use App\Models\Feed;
use App\Models\FeedComponent;
use Carbon\CarbonInterval;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class FeedResource extends Resource
{
    protected static ?string $model = Feed::class;

    protected static ?string $navigationIcon = 'icon-baby-bottle';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                DateTimePicker::make('started_at')
                    ->seconds(false)
                    ->required()
                    ->format('Y-m-d H:i:s'),
                DateTimePicker::make('ended_at')
                    ->seconds(false)
                    ->format('Y-m-d H:i:s'),
                Repeater::make('components')
                    ->relationship()
                    ->schema([
                        Fieldset::make('Contents')
                            ->schema([
                                Select::make('source')
                                    ->options([
                                        FeedSource::BOTTLE->value => 'Bottle',
                                        FeedSource::LEFT_BREAST->value => 'Left Boob',
                                        FeedSource::RIGHT_BREAST->value => 'Right Boob',
                                    ])
                                    ->required()
                                    ->enum(FeedSource::class)
                                    ->live(),
                                Select::make('type')
                                    ->options(fn (Get $get): Collection => collect([
                                        FoodType::BREAST_MILK->value => 'Breast Milk',
                                    ])->when(
                                        $get('source') === FeedSource::BOTTLE->value,
                                        fn (Collection $options) => $options->put(FoodType::FORMULA->value, 'Formula'))
                                    )
                                    ->required()
                                    ->enum(FoodType::class)
                                    ->live(),
                            ]),
                        Fieldset::make('Amount')
                            ->columns(3)
                            ->schema([
                                TimePicker::make('started_at')
                                    ->seconds(false)
                                    ->nullable(),
                                TimePicker::make('ended_at')
                                    ->seconds(false)
                                    ->required(),
                                TextInput::make('volume')
                                    ->type('number')
                                    ->suffix('ml')
                                    ->minValue(0)
                                    ->nullable(),
                                Hidden::make('volume_unit')
                                    ->default('ml'),
                            ]),
                    ])
                    ->mutateRelationshipDataBeforeCreateUsing(fn (array $data) => static::addDateToComponentTimeFields($data, $form))
                    ->mutateRelationshipDataBeforeSaveUsing(fn (array $data) => static::addDateToComponentTimeFields($data, $form))
                    ->addActionLabel('Add component')
                    ->columnSpanFull(),
            ]);
    }

    protected static function addDateToComponentTimeFields(array $data, Form $form): array
    {
        $startedAt = Carbon::parse($form->getRawState()['started_at'])->toImmutable();

        if (isset($data['started_at'])) {
            $data['started_at'] = $startedAt->setTimeFrom($data['started_at']);
        }

        if (isset($data['ended_at'])) {
            $data['ended_at'] = $startedAt->setTimeFrom($data['ended_at']);
        }

        return $data;
    }

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with('components'))
            ->columns([
                TextColumn::make('day')
                    ->label('Day')
                    ->getStateUsing(function (Feed $record) {
                        /** @var Carbon */
                        $date = $record->started_at ?? $record->ended_at;

                        return match (true) {
                            $date->isToday() => 'Today',
                            $date->isYesterday() => 'Yesterday',
                            $date->diffInDays() < 8 => "{$date->format('l, jS F')} ({$date->diffForHumans()})",
                            default => $date->format('l, jS F'),
                        };
                    }),
                TextColumn::make('timing')
                    ->getStateUsing(function (Feed $record) {
                        return collect([
                            $record->started_at->format('H:i'),
                            $record->ended_at?->format('H:i') ?? '',
                        ])->join(' - ');
                    }),
                TextColumn::make('components')
                    ->getStateUsing(function (Feed $record) {
                        return $record->components
                            ->map(function (FeedComponent $component) {
                                $source = str($component->source->value)->replace('_', ' ')->lower();
                                $type = str($component->type->value)->replace('_', ' ')->lower();
                                $volume = $component->volume ? "{$component->volume}ml" : 'unknown volume';
                                /** @var ?CarbonInterval */
                                $interval = $component?->started_at->diffAsCarbonInterval($component->ended_at);
                                $duration = $interval ? "{$interval->roundMinutes()}" : 'a while';

                                return match ($component->source) {
                                    FeedSource::BOTTLE => "{$volume} of bottled {$type} over {$component->started_at->diffForHumans($component->ended_at, syntax: Carbon::DIFF_ABSOLUTE)}",
                                    FeedSource::LEFT_BREAST => "{$duration} on the left boob",
                                    FeedSource::RIGHT_BREAST => "{$duration} on the right boob",
                                    default => 'unknown',
                                };
                            })
                            ->map(fn (string $description) => "<li>{$description}</li>")
                            ->join('');
                    })
                    ->html(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListFeeds::route('/'),
            'create' => Pages\CreateFeed::route('/create'),
            'edit' => Pages\EditFeed::route('/{record}/edit'),
        ];
    }
}
