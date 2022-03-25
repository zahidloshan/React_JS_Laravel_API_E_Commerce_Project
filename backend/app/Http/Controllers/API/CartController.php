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
    public function cart_view()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart_data=Cart::where('user_id',$user_id)->get();
        
                return response()->json([
                    'status'=>200,
                    'cart'=>$cart_data,
                ]);
            

        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Login First To View Cart',
            ]);
        }

        
    }

    public function delete_cart_item(Request $request , $id)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;

            $cart_item =Cart::where('id',$id)->where('user_id',$user_id)->first();
        if($cart_item)
        {
            $cart_item->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Cart Item Delete Successfully',
            ]);
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=>'Id Not found for delete',
            ]);
        }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Login First To View Cart',
            ]);
        }

    }

    public function cart_update($cart_id,$manage_qty)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart_data=Cart::where('user_id',$user_id)->where('id',$cart_id)->first();

            if($manage_qty=="increment")
            {
                $cart_data->product_qty+=1;

            }
            else if($manage_qty=="decrement")
            {
                $cart_data->product_qty-=1;


            }
            $cart_data->update();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Cart Quantity Updated',
                ]);
            

        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Login First To Update Quantity',
            ]);
        }

    }
}
