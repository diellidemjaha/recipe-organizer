<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;
use Illuminate\Support\Facades\Auth;

final readonly class Login
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        
            $credentials = [
                'email' => $args['input']['email'],
                'password' => $args['input']['password'],
            ];
    
            if (Auth::attempt($credentials)) {
                $user = Auth::guard('sanctum')->user();
                $user->tokens()->delete(); // Revoke existing tokens
                $token = $user->createToken('auth-token')->plainTextToken;
    
                // Return the user and token directly
                return [
                    'user' => $user,
                    'token' => $token,
                ];
            }
    
            throw new \Exception('Invalid credentials');
    }
}
