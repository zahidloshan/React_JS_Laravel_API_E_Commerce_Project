<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AddProduct;
use App\Models\Cart;


class CartController extends Controller
{
    public function add_to_cart(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $product_id=$request->product_id;//product_id comes from React Js 
            $product_qty=$request->product_quantity;//product_qty comes from React Js 

            $product_avilable=AddProduct::where('id',$product_id)->first();
            if($product_avilable)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>'Already In Cart',
                    ]);
                }
                else{
                    $cart_item=new Cart;
                    $cart_item->user_id=$user_id;
                    $cart_item->product_id=$product_id;
                    $cart_item->product_qty=$product_qty;
                    $cart_item->save();

                    return response()->json([
                            'status'=>200,
                            'message'=>'Add to Cart Successfully',
                    ]);
                }

            }
            else{
                return response()->json([
                    'status'=>401,
                    'message'=>'Product Not Found',
                ]);
            }


        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Login First Add to Cart',
            ]);
        }
    }
}
