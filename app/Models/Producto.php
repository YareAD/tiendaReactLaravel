<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Producto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "productos";

    protected $fillable = [
        'nombre',
        'precio',
        'image'
    ];

    protected $appends = [
        'image_uri'
    ];

    public function imageUri(): Attribute
    {
        return new Attribute(
            get: fn ($value, $attributes) => Storage::url("public/productos/" . $attributes['image']),
        );
    }

    public function categoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'categoria_id');
    }
}
