<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\AddProduct;


class FrontendController extends Controller
{
    public function getCategory()
    {
        $category=Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }

    public function product($slug)
    {
        $category=Category::where('slug',$slug)->where('status','0')->first();
        if($category)
        {
            $product=AddProduct::where('category_id',$category->id)->where('status','0')->get();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category,
                    ]
                ]);

            }
            else{
                return response()->json([
                    'status'=> 400,
                    'message'=>'No Product  found',
                ]);
            }
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=>'No Category found',
            ]);
        }
    }

    public function product_details($category_slug,$product_slug)
    {
        $category=Category::where('slug',$category_slug)->where('status','0')->first();
        if($category)
        {
            $product=AddProduct::where('category_id',$category->id)->where('slug',$product_slug)->where('status','0')->first();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product'=>$product,
                ]);

            }
            else{
                return response()->json([
                    'status'=> 400,
                    'message'=>'No Product  found',
                ]);
            }
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=>'No Category found',
            ]);
        }

    }
}
