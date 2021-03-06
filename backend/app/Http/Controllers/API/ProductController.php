<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\AddProduct;

class ProductController extends Controller
{
    public function delete_product(Request $request , $id)
    {
        $product =AddProduct::find($id);
        if($product)
        {
            $product->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Product Delete Successfully',
            ]);
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=>'Id Not found for delete',
            ]);
        }
    }

    public function view_product(Request $request)
    {
        $product=AddProduct::all();
        return response()->json([
            'status'=>200,
            'product'=>$product,
        ]);
    }
    public function edit_product($id)
    {
        $product=AddProduct::find($id);
        if($product)
        {
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No Product Id found',
            ]);
        }
        


        
    
    }

    public function update_product(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [

            'slug' => 'required|max: 191',
            'name' => 'required|max: 191',
            'metatitle' => 'required|max: 191',
            'selling_price' => 'required|max: 20',
            'original_price' => 'required|max: 20',
            'qty' => 'required|max: 4',
            'brand' => 'required|max: 20',
            'category_id' => 'required|integer|max: 191',
        
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
            $product=AddProduct::find($id);
            if($product)
            {
                $product->category_id=$request->input('category_id');
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
                $path=$product->image;
                if(File::exists($path))
                {
                    File::delete($path);

                }

                $file = $request->file('image');

                $extension = $file->getClientOriginalExtension();

                $filename = time().'.'.$extension;

                $file->move('uploads/product/',$filename); 
                $product->image = 'uploads/product/'.$filename;

            }                                                               


            $product->description=$request->input('description');
            $product->featured=$request->input('featured');
            $product->popular=$request->input('popular');
            $product->status=$request->input('status');
            $product->update();


            return response()->json([
                'status'=> 200,
                'message'=>'Product Update Successfully',
            ]);

            }

            else{
                return response()->json([
                    'status'=> 404,
                    'message'=>'Poduct Id not fournd',
                ]);
            }
            
        }
    }



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
