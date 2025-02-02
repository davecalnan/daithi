<?php

namespace App\Models;

use App\Data\FeedSource;
use App\Data\FoodType;
use App\Models\Scopes\DefaultOrderScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeedComponent extends Model
{
    /** @use HasFactory<\Database\Factories\FeedComponentFactory> */
    use HasFactory;

    protected $casts = [
        'source' => FeedSource::class,
        'type' => FoodType::class,
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new DefaultOrderScope('ended_at', 'asc'));

        static::saved(function (self $component) {
            $component->loadMissing('feed');

            $component->feed->updateEndedAt();
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function feed(): BelongsTo
    {
        return $this->belongsTo(Feed::class);
    }
}
