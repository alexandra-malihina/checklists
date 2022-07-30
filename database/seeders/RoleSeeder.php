<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\Entity;
use App\Models\RoleAction;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$roles = [
			[
				'name' => 'Администратор',
				'code' => 'admin'
			],
		];

		$all_roles = [];
		foreach ( $roles as $role) {
			$all_roles[] = Role::query()
			->updateOrCreate($role)->id;
		}

		$all_actions = Action::all()->modelKeys();
		$all_entities = Entity::all()->modelKeys();

		// $role_actions = [];

		foreach($all_roles as $role) {
			// $role_action = [];
			foreach ($all_entities as $entity) {
				foreach($all_actions as $action) {
					$role_action = [
						'role_id' => $role,
						'action_id' => $action,
						'entity_id'=> $entity
					];
					RoleAction::query()
					->updateOrCreate($role_action);
				}
			}
			

		}

    }
}
