<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = Auth::guard('sanctum')->user();

        if ($user) {
            $user->tokens()->delete();

            // Optionally, clear any other session-related data
            auth()->logout();

            return true;
        }

        return false;
    }
}
