<?php

use App\Http\Controllers\CheckListController;
use App\Http\Controllers\CheckListItemController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
	//Получение информации о текущм пользователе
	Route::get('/user', function (Request $request) {
		return new UserResource($request->user());
	});

	// Обработка чек-листов
	Route::resource('check-lists', CheckListController::class)->only([
		'store', 'update', 'destroy', 'index'
	]);

	// Обработка пунктов чек-листа
	Route::resource('check-lists.items', CheckListItemController::class)->only([
		'store', 'update', 'destroy', 'index'
	]);

	// Админка
	Route::prefix('admin')->middleware('admin')->group( function () {

		// Обработка пользователей в админке
		Route::resource('users', UserController::class)->only([
			'store', 'update', 'destroy', 'index'
		]);

		// Права текущего администратора
		Route::get('/user/actions', function (Request $request) {
			$user = $request->user();
			$user->load(['actions.entity','actions.action']);
			$actions = [];
			foreach ($user->actions as $action) {
				$actions[$action->action->code][$action->entity->code] = 1;
			}
			session(['actions' => $actions]);
			return $actions;
		});
	});
});
