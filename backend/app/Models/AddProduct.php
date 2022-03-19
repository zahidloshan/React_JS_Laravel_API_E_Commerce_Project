<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class AddProduct extends Model
{
    use HasFactory;
    protected $table ='product';
    protected $fillable = [
        'category_id',
        'metatitle',
        'metakeywords',
        'metadescription',
        'slug',
        'name',
        'selling_price',
        'original_price',
        'qty',
        'brand',
        'image',
        'description',
        'featured',
        'popular',
        'status',
    ];

    
}
