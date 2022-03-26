<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orderitems extends Model
{
    use HasFactory;
    protected $table ='ordersitems';
    protected $fillable = [
        'order_id',
        'product_id',
        'qty',
        'price',
    ];
}
