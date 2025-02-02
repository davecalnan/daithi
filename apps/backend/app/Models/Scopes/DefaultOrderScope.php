<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class DefaultOrderScope implements Scope
{
    public function __construct(
        public string $column,
        public string $direction,
    ) {}

    public function apply(Builder $builder, Model $model): void
    {
        $builder->orderBy($this->column, $this->direction);
    }
}
