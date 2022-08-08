<?php

namespace App\Http\Controllers;

use App\Helpers\UserHelper;
use App\Models\Action;
use App\Models\Entity;
use App\Models\User;
use App\Models\UserAction;
use Faker\Provider\UserAgent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		if (Gate::none('view-roles')) {
			abort(403, 'У Вас нет прав для просмотра!');
		}

		$actions = DB::table('actions as a')
		->selectRaw("JSON_OBJECTAGG(a.code , (select JSON_OBJECTAGG(e.code, 0) from entities as e )) as action")
		->first();

		$actions_struct = json_decode($actions->action, true);
		$users = User::select(['name', 'id', 'admin'])->with(['actions.action', 'actions.entity'])->where('admin', 1)->paginate(7);

		$return_data = [
			'last_page' => $users->lastPage(),
			'current_page' => $users->currentPage(),
			'data' => [],
			'can_edit_roles' => Gate::check('edit-roles')
		];
		foreach ($users as $user) {
			$item = [
				'id' => $user->id,
				'name' => $user->name,
				'actions' => $actions_struct
			];
			// $user->actions_input = $actions_struct;
			foreach($user->actions as $action) {
				$item['actions'][$action->action->code][$action->entity->code] = 1;
				// return $user->actions_input[$action->action->code];
				// $user->actions_input[$action->action->code][$action->entity->code] = 1;
			}
			$return_data['data'][] = $item;
		}


        return $return_data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id)
    {
		if (Gate::none('edit-roles')) {
			abort(403, 'У Вас нет прав для редактирования!');
		}

		// return $user;
		$return_data = [
			'error' => false,
			'message' => '',
			'data' => []
		];

		$action = intval($request->input('action'));
		$entity = intval($request->input('entity'));
		$active = intval($request->input('active'));

		if ($active) {
			UserAction::query()->updateOrCreate(
				[
					'user_id' => $user_id,
					'action_id' => $action,
					'entity_id' => $entity,
				]
			);
		}
		else {
			UserAction::where('user_id', $user_id)
			->where('action_id', $action)
			->where('entity_id', $entity)
			->delete();
		}

		return $return_data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

	/**
	 * Сущности для управления
	 */
	public function actions() 
	{
		$return_data = [];
		$return_data['actions'] = Action::query()->orderBy('name')->get();
		$return_data['entities'] = Entity::query()->orderBy('name')->get();

		return $return_data;
	}
}
