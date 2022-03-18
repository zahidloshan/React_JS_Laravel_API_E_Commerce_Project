<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () { 
        return response()->json(['message' => 'You are in', 'status'=>200], 200); 
    });
    //Create Category 
    Route::post('add_category',[CategoryController::class,'add_category']);
    Route::get('view_category',[CategoryController::class,'view_category']);
    Route::get('edit_category/{id}',[CategoryController::class,'edit_category']);
    Route::put('update_category/{id}',[CategoryController::class,'update_category']);
    Route::delete('delete_category/{id}',[CategoryController::class,'delete_category']);
    //Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
