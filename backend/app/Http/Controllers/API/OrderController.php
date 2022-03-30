<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;


class OrderController extends Controller
{
    public function view_order_list(Request $request)
    {
        $order =Order::all();
        return response()->json([
            'status'=>200,
            'order'=>$order,
        ]);
    }
}
