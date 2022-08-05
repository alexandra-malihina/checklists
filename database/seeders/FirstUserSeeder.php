<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\Entity;
use App\Models\RoleUser;
use App\Models\User;
use App\Models\UserAction;
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
				'password' => Hash::make('123123123'),
				'admin' => 1
			]
		);
		$all_actions = Action::get();
		$all_entities = Entity::get();
		
		foreach ($all_entities as $entity) {
			foreach  ($all_actions as $action) {
				UserAction::updateOrCreate(
					[
						'user_id' => $first_user->id,
						'action_id' => $action->id,
						'entity_id' => $entity->id
					]
					);
			}
		}
    }
}
