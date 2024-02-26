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

            // $imagePath = $args['input']['image_path'];

            // Log the received image_path
            // Log::info('Received image_path: ' . $imagePath);

            $recipe = Recipe::create([
                'user_id' => $user->id,
                'title' => $args['input']['title'],
                'ingredients' => $args['input']['ingredients'],
                'steps' => $args['input']['steps'],
                'tags' => $args['input']['tags'],
                // 'image_path' => $imagePath,
            ]);

            return $recipe;
        } catch (\Exception $e) {
            // Log or return the exception message for debugging
            Log::error($e->getMessage());

            return ['error' => $e->getMessage()];
        }
    }
}
