<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckLists extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('check_lists', function (Blueprint $table) {
			$table->id();
			$table->string('name', 150)->comment('Наименование списка');
			$table->unsignedBigInteger('user_id');
			$table->tinyInteger('is_done')->default(0)->comment('Выполнен ли чек-лист');
			$table->timestamps();

			$table->foreign('user_id')
				->references('id')
				->on('users')
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
		Schema::dropIfExists('check_lists');
	}
}
