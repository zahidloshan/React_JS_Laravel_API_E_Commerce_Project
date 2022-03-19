<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('metatitle')->nullable();
            $table->mediumText('metakeywords')->nullable();
            $table->mediumText('metadescription')->nullable();
            $table->string('slug');
            $table->string('name');
            $table->string('selling_price');
            $table->string('original_price');
            $table->string('qty');
            $table->string('brand');
            $table->string('image')->nullable();
            $table->longText('description')->nullable();
            $table->tinyInteger('featured')->default(0)->nullable();
            $table->tinyInteger('popular')->default(0)->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
