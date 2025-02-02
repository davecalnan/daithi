<?php

namespace App\Models;

use App\Models\Scopes\DefaultOrderScope;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

class Feed extends Model
{
    /** @use HasFactory<\Database\Factories\FeedFactory> */
    use HasFactory;

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new DefaultOrderScope('started_at', 'desc'));
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors & Mutators
    |--------------------------------------------------------------------------
    */

    public function endedAt(): Attribute
    {
        return Attribute::get(function (?string $value): ?Carbon {
            if ($value) {
                return Carbon::parse($value);
            }

            $this->loadMissing('finalComponent');

            return $this->finalComponent?->ended_at;
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function components(): HasMany
    {
        return $this->hasMany(FeedComponent::class);
    }

    public function finalComponent(): HasOne
    {
        return $this->components()
            ->withoutGlobalScope(DefaultOrderScope::class)
            ->one()
            ->ofMany(column: 'ended_at', aggregate: 'MAX');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function updateEndedAt(): void
    {
        $this->loadMissing('finalComponent');

        if (is_null($this->ended_at) || is_null($this->finalComponent)) {
            return;
        }

        $this->update([
            'ended_at' => $this->finalComponent->ended_at,
        ]);
    }
}
