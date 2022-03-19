<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function delete_category(Request $request , $id)
    {
        $category =Category::find($id);
        if($category)
        {
            $category->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Category Delete Successfully',
            ]);
        }
        else{
            return response()->json([
                'status'=> 404,
                'message'=>'Id Not found for delete',
            ]);
        }
    }
    public function update_category(Request $request , $id)
    {
        


        $validator = Validator::make($request->all(), [

            'slug' => 'required|max: 191',
            'name' => 'required|max: 191',
            'metatitle' => 'required|max: 191',
        
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
            $category=Category::find($id);
            if($category)
            {
                $category->metatitle=$request->input('metatitle');
                $category->metakeywords=$request->input('metakeywords');
                $category->metadescription=$request->input('metadescription');
                $category->slug=$request->input('slug');
                $category->name=$request->input('name');
                $category->description=$request->input('description');
                $category->status=$request->input('status')==true ? '1':'0';
                $category->save();
    
                return response()->json([
                    'status'=> 200,
                    'message'=>'Category Update Successfully',
                ]);
                

            }
            else{
                return response()->json([
                    'status'=> 404,
                    'message'=>'Id not fournd',
                ]);
            }
        }
        
    }
    public function edit_category($id)
    {
        $category=Category::find($id);
        if($category)
        {
            return response()->json([
                'status'=>200,
                'category'=>$category,
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No Category Id found',
            ]);
        }
        

    }
    public function view_category(Request $request)
    {
        $category =Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }
    public function all_category(Request $request)
    {
        $category =Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }
    public function add_category (Request $request)
    {
        


        $validator = Validator::make($request->all(), [

            'slug' => 'required|max: 191',
            'name' => 'required|max: 191',
            'metatitle' => 'required|max: 191',
        
        ]);
        
        if($validator->fails())
        
        {
        
            return response()->json([
                'status'=> 400,
                'errors'=>$validator->messages(),
            
            ]);
        
        }
        
        else
        {
            $category=new Category;
            $category->metatitle=$request->input('metatitle');
            $category->metakeywords=$request->input('metakeywords');
            $category->metadescription=$request->input('metadescription');
            $category->slug=$request->input('slug');
            $category->name=$request->input('name');
            $category->description=$request->input('description');
            $category->status=$request->input('status')==true ? '1':'0';
            $category->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Category Added Successfully',
            ]);
        }
    }
}
