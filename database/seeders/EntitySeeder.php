<?php

namespace Database\Seeders;

use App\Models\Entity;
use Illuminate\Database\Seeder;

class EntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $entities = [
			[
				'name' => 'Пользователи',
				'code' => 'users'
			],
			[
				'name' => 'Списки',
				'code' => 'check_lists'
			],
			[
				'name' => 'Пользовательские права',
				'code' => 'roles'
			]
		];

		foreach ( $entities as $entity) {
			Entity::query()
			->updateOrCreate($entity);
		}
    }
}
