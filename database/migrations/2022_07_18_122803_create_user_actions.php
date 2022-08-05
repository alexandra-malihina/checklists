<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserActions extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_action', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('user_id');
			$table->unsignedBigInteger('action_id');
			$table->unsignedBigInteger('entity_id');

			$table->foreign('user_id')
				->references('id')
				->on('users')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->foreign('action_id')
				->references('id')
				->on('actions')
				->constrained()
				->onUpdate('cascade')
				->onDelete('cascade');
			$table->foreign('entity_id')
				->references('id')
				->on('entities')
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
		Schema::dropIfExists('user_action');
	}
}
