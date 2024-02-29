<?php declare(strict_types=1);

namespace App\GraphQL\Queries;
use App\Models\User;

final readonly class GetUserProfileRecipes
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $userId = $args['userId'];
        
        // Use eager loading to fetch recipes along with the user
        $user = User::with('recipes')->findOrFail($userId);
    
        // Access the recipes relationship directly
        $recipes = $user->recipes ?? [];

        return $recipes;
    }
}