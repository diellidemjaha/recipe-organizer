<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\GraphQL\Mutations\Register;
use App\GraphQL\Mutations\Login;
use App\GraphQL\Mutations\Logout;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(Register::class);
        $this->app->singleton(Login::class);
        $this->app->singleton(Logout::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
