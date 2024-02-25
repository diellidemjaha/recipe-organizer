<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


final class CreateRecipe
{
    public function __invoke(null $_, array $args)
    {
        try {
            $user = Auth::guard('sanctum')->user();

            if (!$user) {
                throw new \Exception('User not authenticated.');
            }

            $recipe = Recipe::create([
                'user_id' => $user->id,
                'title' => $args['input']['title'],
                'ingredients' => $args['input']['ingredients'],
                'steps' => $args['input']['steps'],
                'tags' => $args['input']['tags'],
                'image_path' => $args['input']['image_path'],
            ]);

            return $recipe;
        } catch (\Exception $e) {
            // Log or return the exception message for debugging
            Log::error($e->getMessage());

            // Return a specific error message or null if needed
            return null;
        }
    }
}
