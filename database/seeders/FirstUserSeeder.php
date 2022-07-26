<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FirstUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $first_user = User::query()
		->firstOrCreate([
			'name' => 'admin',
			'email' => 'admin@mail.ru',
			'password' => Hash::make('123123')
		]);
		
    }
}
