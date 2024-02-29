<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Recipe;


class ImageController extends Controller
{
    public function upload(Request $request, $recipeId)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480',
    ]);

    $user_id = auth('sanctum')->id(); // Assuming you are using authentication

    $image = $request->file('image');
    
    // Validate and store the uploaded image
    $filename = $this->storeImage($user_id, $image);

    // Save the image_path to the corresponding recipe record
    $recipe = Recipe::find($recipeId);

    if ($recipe) {
        $recipe->update(['image_path' => $filename]);
    }

    return response()->json(['image_path' => $filename], 201);
}
    
    private function storeImage($user_id, $image)
    {
        // Generate a unique filename
        $filename = uniqid() . '_' . $user_id . '.' . $image->getClientOriginalExtension();
    
        // Store the file with the generated filename
        $image->storeAs('public/images', $filename);
    
        return $filename;
    }
}
