<?php

namespace Database\Seeders;

use App\Models\ActionModel;
use App\Models\EntityModel;
use App\Models\RoleActionModel;
use App\Models\RoleModel;
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
			$all_roles[] = RoleModel::query()
			->updateOrCreate($role)->id;
		}

		$all_actions = ActionModel::all()->modelKeys();
		$all_entities = EntityModel::all()->modelKeys();

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
					RoleActionModel::query()
					->updateOrCreate($role_action);
				}
			}
			

		}

    }
}
