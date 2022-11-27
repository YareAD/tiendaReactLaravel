<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::with('categoria')->get();
        return Inertia::render('productos/Productos', ['productos' => $productos]);
    }

    public function create()
    {
        $categorias = Categoria::all();
        return Inertia::render('productos/Nuevo', ['categorias' => $categorias]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'image' => 'required',
            'precio' => 'required|numeric',
            'categoria_id' => 'required|integer',
        ]);


        $img = $request->file('image', null);
        $image = sha1(date('YmdHis') . Str::random(30)) . '.' . $img->extension();

        $nombre = $request->input('nombre');
        $precio = $request->input('precio');
        $categoria_id = $request->input('categoria_id');


        Storage::disk('public')->putFileAs("productos", $img, $image);

        $producto = new Producto();
        $producto->nombre = $nombre;
        $producto->image = $image;
        $producto->precio = $precio;
        $producto->categoria_id = $categoria_id;
        $producto->save();


        return redirect("/productos");
    }

    public function delete(Producto $producto)
    {
        $producto->delete();
    }

    public function edit(Producto $producto)
    {
        $categorias = Categoria::all();
        return Inertia::render('productos/Nuevo', ['categorias' => $categorias, 'producto' => $producto]);
    }

    public function update(Producto $producto, Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            // 'image' => 'nullable|file',
            'precio' => 'required|numeric',
            'categoria_id' => 'required|integer',
        ]);


        // $img = $request->file('image', null);

        // if ($img) {
        //     $image = sha1(date('YmdHis') . Str::random(30)) . '.' . $img->extension();
        //     Storage::disk('public')->putFileAs("productos", $img, $image);
        //     $producto->image = $image;
        // }

        $nombre = $request->input('nombre');
        $precio = $request->input('precio');
        $categoria_id = $request->input('categoria_id');

        $producto->nombre = $nombre;
        $producto->precio = $precio;
        $producto->categoria_id = $categoria_id;
        $producto->save();


        return redirect("/productos");
    }

    public function carrito()
    {
        return Inertia::render('productos/Carrito');
    }
}
