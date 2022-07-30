<?php

namespace Database\Seeders;

use App\Models\Action;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$actions = [
			[
				'name' => 'Просмотр',
				'code' => 'view'
			],
			[
				'name' => 'Создание',
				'code' => 'create'
			],
			[
				'name' => 'Изменение',
				'code' => 'edit'
			],
			[
				'name' => 'Удаление',
				'code' => 'delete'
			],
		];

		foreach ( $actions as $action) {
			Action::query()
			->updateOrCreate($action);
		}
    }
}
