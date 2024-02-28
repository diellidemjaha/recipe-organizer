<?php declare(strict_types=1);

namespace App\GraphQL\Queries;
use Illuminate\Support\Facades\Auth;
use App\Models\Recipe;

final readonly class GetUserRecipes
{
    /** @param  array{}  $args */
    public function __invoke($_, array $args)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            throw new \Exception('User not authenticated.');
        }

        return Recipe::where('user_id', $user->id)->get();
    }
}
