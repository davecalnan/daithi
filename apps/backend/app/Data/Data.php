<?php

namespace App\Data;

use Spatie\LaravelData\Data as BaseData;

class Data extends BaseData
{
    public function validated()
    {
        $array = $this->toArray();

        return collect(static::getValidationRules([]))
            ->map(fn (mixed $rule, string $ruleKey) => str($ruleKey)->explode('.')->first())
            ->filter(fn (string $key) => array_key_exists($key, $array))
            ->mapWithKeys(fn (string $key) => [$key => $array[$key] ?? null])
            ->all();
    }
}
