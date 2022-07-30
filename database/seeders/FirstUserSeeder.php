<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\RoleUser;
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
		->updateOrCreate(
			[
				'name' => 'admin',
			],
			[
				'email' => 'admin@mail.ru',
				'password' => Hash::make('123123123')
			]
		);
		$admin_role = Role::where('code', 'admin')->first();

		RoleUser::query()
		->updateOrCreate([
			'user_id' => $first_user->id,
			'role_id' => $admin_role->id
		]);
    }
}
