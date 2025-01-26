<?php

namespace App\Data;

use Spatie\LaravelData\Data as BaseData;

class Data extends BaseData
{
    public function validated()
    {
        return collect(static::getValidationRules([]))
            ->mapWithKeys(function ($rule, $ruleKey) {
                $key = str($ruleKey)->explode('.')->first();

                return [$key => $this->$key];
            })
            ->all();
    }
}
