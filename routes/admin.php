<?php

use App\Helpers\UserHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth:sanctum')->middleware('admin')->group(function () {


	Route::get('/actions', function (Request $request) {
		$user = $request->user();
		$user->load(['actions.entity','actions.action']);

		return UserHelper::getUserActions($user);
		// $actions = [];
		// foreach ($user->actions as $action) {
		// 	$actions[$user->actions->action->code][$user->actions->entity->code] = 1;
		// }
		// // $return_data['actions'] = $actions;
		// // var_dump('hi');
		// // exit();
		// // $user = $request->user();
		// // return $user->hasRole('admin');
		// return $actions;
	});

});

// Auth::routes();

// Route::middleware('auth:sanctum')->group(function () {
// 	Route::get('/user', function (Request $request) {
// 		return $request->user();
// 	});
// 	Route::resource('check-lists', CheckListController::class)->only([
// 		'store', 'update', 'destroy', 'index'
// 	]);
// 	Route::resource('check-lists.items', CheckListItemController::class)->only([
// 		'store', 'update', 'destroy', 'index'
// 	]);
// });
