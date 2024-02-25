<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use App\Models\Recipe;

final readonly class UpdateRecipe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $recipe = Recipe::findOrFail($args['id']);

        $recipe->update([
            'title' => $args['input']['title'] ?? $recipe->title,
            'ingredients' => $args['input']['ingredients'] ?? $recipe->ingredients,
            'steps' => $args['input']['steps'] ?? $recipe->steps,
            'tags' => $args['input']['tags'] ?? $recipe->tags,
            'image_path' => $args['input']['image_path'] ?? $recipe->image_path,
        ]);

        return $recipe;    }
}
