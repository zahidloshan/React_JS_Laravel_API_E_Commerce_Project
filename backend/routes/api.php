<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;


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
Route::get('getCategory',[FrontendController::class,'getCategory']);
Route::get('fetchproducts/{slug}',[FrontendController::class,'product']);
Route::get('product_details/{category_slug}/{product_slug}',[FrontendController::class,'product_details']);
//Cart
Route::post('add_to_cart',[CartController::class,'add_to_cart']);
Route::get('cart_view',[CartController::class,'cart_view']);
Route::put('cart_quantiy_update/{cart_id}/{manage_qty}',[CartController::class,'cart_update']);
Route::delete('delete_cart_item/{id}',[CartController::class,'delete_cart_item']);
//Order
Route::post('buyproduct',[CheckoutController::class,'placeorder']);
Route::post('order_validate',[CheckoutController::class,'order_validate']);



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
    Route::get('all_category',[CategoryController::class,'all_category']);

    //prduct
    Route::post('add_product',[ProductController::class,'add_product']);
    Route::get('view_product',[ProductController::class,'view_product']);
    Route::get('edit_product/{id}',[ProductController::class,'edit_product']);
    Route::post('update_product/{id}',[ProductController::class,'update_product']);
    Route::delete('delete_product/{id}',[ProductController::class,'delete_product']);
    
    //Order
    Route::get('view_order_list',[OrderController::class,'view_order_list']);




    //Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
