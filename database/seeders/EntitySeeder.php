<?php

namespace Database\Seeders;

use App\Models\EntityModel;
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
			]
		];

		foreach ( $entities as $entity) {
			EntityModel::query()
			->updateOrCreate($entity);
		}
    }
}
