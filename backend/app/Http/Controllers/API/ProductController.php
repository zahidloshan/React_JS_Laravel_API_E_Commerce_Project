<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AddProduct;

class ProductController extends Controller
{
    public function add_product(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'slug' => 'required|max: 191',
            'name' => 'required|max: 191',
            'metatitle' => 'required|max: 191',
            'selling_price' => 'required|max: 20',
            'original_price' => 'required|max: 20',
            'qty' => 'required|max: 4',
            'brand' => 'required|max: 20',
            'categoryid' => 'required|max: 191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max: 10000',
        
        ]);
        
        if($validator->fails())
        
        {
        
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages(),
            
            ]);
        
        }
        
        else
        {
            $product=new AddProduct;
            $product->category_id=$request->input('categoryid');
            $product->metatitle=$request->input('metatitle');
            $product->metakeywords=$request->input('metakeywords');
            $product->metadescription=$request->input('metadescription');
            $product->slug=$request->input('slug');
            $product->name=$request->input('name');
            $product->selling_price=$request->input('selling_price');
            $product->original_price=$request->input('original_price');
            $product->qty=$request->input('qty');
            $product->brand=$request->input('brand');



            //Image Store in database
            if($request->hasFile('image'))

            {

                $file = $request->file('image');

                $extension = $file->getClientOriginalExtension();

                $filename = time().'.'.$extension;

                $file->move('uploads/product/',$filename); 
                $product->image = 'uploads/product/'.$filename;

            }                                                               


            $product->description=$request->input('description');
            $product->featured=$request->input('featured')==true ? '1':'0';
            $product->popular=$request->input('popular')==true ? '1':'0';
            $product->status=$request->input('status')==true ? '1':'0';
            $product->save();


            return response()->json([
                'status'=> 200,
                'message'=>'Product  Added Successfully',
            ]);
        }
    }
}
