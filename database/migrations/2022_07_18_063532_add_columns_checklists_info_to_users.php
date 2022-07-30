<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsChecklistsInfoToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger('active')->default(1)->comment('Заблокирован ли пользователь');
			$table->integer('max_check_lists_count')->default(5)->comment('Максимальное разрешенное кол-во списков');
			$table->integer('current_check_lists_count')->default(0)->comment('Текущее кол-во списков');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('active');
            $table->dropColumn('max_check_lists_count');
            $table->dropColumn('current_check_lists_count');
        });
    }
}
