<?php

use App\Http\Controllers\CheckListController;
use App\Http\Controllers\CheckListItemController;
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
	Route::get('/user', function (Request $request) {
		return $request->user();
	});
	Route::resource('check-lists', CheckListController::class, [
		'store', 'edit', 'destroy', 'index'
	]);
	Route::resource('check-lists.items', CheckListItemController::class, [
		'store', 'edit', 'destroy', 'index'
	]);
});
