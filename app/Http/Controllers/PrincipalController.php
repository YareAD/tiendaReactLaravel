<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PrincipalController extends Controller
{
    public function index()
    {
        $categorias = Categoria::get()->map(function ($c) {
            $c->productos;
            return $c;
        });
        return Inertia::render('Principal', ['categorias' => $categorias]);
    }
}
