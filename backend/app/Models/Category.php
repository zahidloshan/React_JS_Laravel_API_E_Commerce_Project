<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table ='_categories';
    protected $fillable = [
        'metatitle',
        'metakeywords',
        'metadescription',
        'slug',
        'name',
        'description',
        'status',
    ];
}
