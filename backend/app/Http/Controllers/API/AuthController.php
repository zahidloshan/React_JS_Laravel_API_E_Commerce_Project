<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request)
    {
            $validator = Validator::make($request->all(), [

                'name' => 'required|max: 191',
                'email' => 'required|email|max: 191|unique:users,email', 
                'password' => 'required|min: 8',
            
            ]);
            
            if($validator->fails())
            
            {
            
                return response()->json([
                
                'validation_errors'=>$validator->messages(),
                
                ]);
            
            }
            
            else
            {
                $user = User::create([
                
                'name'=>$request->name, 
                'email'=>$request->email,
                'password'=>$request->password,
            
            ]);
            
            $token = $user->createToken ($user->email.'_Token')->plainTextToken;
            
                return response()->json ([
                
                  'status'=>200,
                  'username'=>$user->name,
                  'token'=>$token,
                  'message'=> 'Registation Sucessfully'
            
                 ]);
            }
    }
    
    public function login (Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|max: 191', 
            'password' => 'required|min: 8',
        
        ]);

        if($validator->fails())

        {

            return response()->json([
            
            'validation_errors'=>$validator->messages(),
            
            ]);

        }

        else{
            $user = User::where('email', $request->email)->first();

            if ( ($user->password != $request->password) || ($user->email != $request->email))
            {
                return response()->json ([
            
                    'status'=>401,
                    'message'=> 'Invalid Login',
            
                ]);
            }

            else{
                    $token = $user->createToken ($user->email.'_Token')->plainTextToken;

                        return response()->json ([
                        
                        'status'=>200,
                        'username'=>$user->name,
                        'usertype'=>$user->role_as,
                        'token'=>$token,
                        'message'=> 'Login in Sucessfully'
                    
                        ]);
                    }
            }

        }

    
        public function logout()
        {
            auth()->user()->tokens()->delete();

            return response()->json ([
                        
                'status'=>200,
                'message'=> 'Logout Sucessfully',
            
            ]);

        }
}


