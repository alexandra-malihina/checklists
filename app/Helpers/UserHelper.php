<?php
namespace App\Helpers;

use App\Models\User;

use function PHPUnit\Framework\isNull;

class UserHelper {

	public static function getAuthUserActions(User $user) {

		if ( (session()->has('actions'))) {
			self::setAuthUserActionsSession($user);
		}

		return session()->get('actions');

	}

	public static function setAuthUserActionsSession(User $user) {
		$actions = [];
		if ($user->admin && $user->active) {
			$actions = self::getUserActions($user);
		}

		session(['actions' => $actions]);		
	}

	public static function getUserActions(User $user) {
		if (!isset($user->actions)) {

			$user->load(['actions.entity','actions.action']);
		}
		$actions = [];
		foreach ($user->actions as $action) {
			$actions[$action->action->code][$action->entity->code] = 1;
		}
		// $return_data['actions'] = $actions;
		// var_dump('hi');
		// exit();
		// $user = $request->user();
		// return $user->hasRole('admin');
		return $actions;
	}
}