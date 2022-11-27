<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Categoria::insert([
            ['nombre' => 'Damas'],
            ['nombre' => 'Caballeros'],
            ['nombre' => 'Niños']
        ]);
    }
}
