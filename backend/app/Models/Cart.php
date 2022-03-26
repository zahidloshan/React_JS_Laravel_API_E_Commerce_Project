<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AddProduct;


class Cart extends Model
{
    use HasFactory;
    protected $table ='_cart';
    protected $fillable = [
        'user_id',
        'product_id',
        'product_qty',
    ];
    protected $with = ['product'];

    public function product()

    {
        return $this->belongsTo(AddProduct::class, 'product_id', 'id');
    }
}
