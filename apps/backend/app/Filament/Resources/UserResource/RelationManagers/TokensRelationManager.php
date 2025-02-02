<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Laravel\Sanctum\NewAccessToken;

class TokensRelationManager extends RelationManager
{
    protected static string $relationship = 'tokens';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\DateTimePicker::make('expires_at')
                    ->label('Expires At')
                    ->helperText('Leave empty for no expiration.')
                    ->nullable(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->heading('API Keys')
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('tokenable.name')
                    ->label('User'),
                Tables\Columns\TextColumn::make('last_used_at')
                    ->label('Last used')
                    ->since()
                    ->dateTimeTooltip()
                    ->placeholder('Never'),
                Tables\Columns\TextColumn::make('expires_at')
                    ->label('Expires in')
                    ->since()
                    ->dateTimeTooltip()
                    ->placeholder('Never'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('New API Key')
                    ->modalHeading('Create API Key')
                    ->action(function (array $arguments, CreateAction $action, Form $form, HasTable $livewire) {
                        /** @var User */
                        $model = $this->getOwnerRecord();

                        /** @var NewAccessToken */
                        $newToken = $action->process(function (array $data) use ($model) {
                            return $model->createToken(
                                name: $data['name'],
                                expiresAt: $data['expires_at'] ?? null,
                            );
                        });

                        $action->record($newToken->accessToken);
                        $form->model($newToken->accessToken)->saveRelationships();

                        $action->successNotification(
                            Notification::make()
                                ->success()
                                ->title('Created API Key')
                                ->body("This will only be shown once. Make sure to save it somewhere secure: {$newToken->plainTextToken}")
                                ->persistent(),
                        );

                        if ($arguments['another'] ?? false) {
                            $action->callAfter();
                            $action->sendSuccessNotification();

                            $action->record(null);

                            // Ensure that the form record is anonymized so that relationships aren't loaded.
                            $form->model($model);
                            $livewire->mountedTableActionRecord(null);

                            $form->fill();

                            $action->halt();

                            return;
                        }

                        $action->success();
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
