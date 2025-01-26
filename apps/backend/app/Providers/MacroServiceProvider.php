<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $paginateAsRequested = function (?Request $request = null) {
            /** @var \Illuminate\Http\Request */
            $request ??= request();

            return $this->paginate(
                $request->get('per_page', 25),
                ['*'],
                'page',
                $request->get('page', 1)
            );
        };

        Builder::macro('paginateAsRequested', $paginateAsRequested);
        BelongsToMany::macro('paginateAsRequested', $paginateAsRequested);
    }
}
