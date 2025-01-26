<?php

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;

class NappyData extends Data
{
    public function __construct(
        public ?int $id,
        #[WithCast(DateTimeInterfaceCast::class)]
        public DateTime $changed_at,
        public bool $is_wet,
        public bool $is_dirty,
        public ?string $notes,
    ) {}
}
