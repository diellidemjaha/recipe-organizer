<?php declare(strict_types=1);

namespace App\GraphQL\Queries;
use App\Models\Recipe;

final readonly class SearchRecipe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
      // Extract the title from the arguments
      $title = $args['title'] ?? '';

      // Use the extracted title in the query
      return Recipe::where('title', 'like', '%' . $title . '%')->get();
    }
}
