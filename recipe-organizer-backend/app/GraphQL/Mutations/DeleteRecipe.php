<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use App\Models\Recipe;  

final readonly class DeleteRecipe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $recipe = Recipe::findOrFail($args['id']);
        $recipe->delete();

        return $recipe;    }
}
