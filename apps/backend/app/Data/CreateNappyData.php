<?php

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Optional;

class CreateNappyData extends Data
{
    public function __construct(
        #[WithCast(DateTimeInterfaceCast::class)]
        public DateTime|null|Optional $changed_at,
        public bool $is_wet,
        public bool $is_dirty,
        public string|null|Optional $notes,
    ) {}
}
