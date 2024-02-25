<?php declare(strict_types=1);

namespace App\GraphQL\Queries;
use App\Models\Recipe;  

final readonly class GetRecipes
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        return Recipe::all();
    }
}
