<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChecklistItems extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('checklist_items', function (Blueprint $table) {
			$table->id();
			$table->integer('item_number')->comment('Номер пункта списка');
			$table->string('name', 255)->comment('Наименование пункта');
			$table->tinyInteger('is_done')->default(0)->comment('Выполнен ли пункт из списка');
			$table->unsignedBigInteger('check_list_id');

			$table->timestamps();

			$table->foreign('check_list_id')
				->references('id')
				->on('check_lists')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('checklist_items');
	}
}
