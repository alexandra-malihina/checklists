<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		if (Gate::none('view-users')) {
			abort(403);
		}

		$users = User::query();

		if (Gate::check('view-checklists')) {
			$users = $users->with(['checklists']);
		}

		$users = $users->paginate(7);

		$return_data = [
			'last_page' => $users->lastPage(),
			'current_page' => $users->currentPage(),
			'data' => $users->items(),
			'can_edit_users' => Gate::check('edit-users'),
			'can_edit_roles' => Gate::check('edit-roles'),
			'can_view_checklists' => Gate::check('view-checklists')
		];
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
    public function update(Request $request, User $user)
    {
        $return_data = [
			'error' => false,
			'message' => "Пользователь успешно обновлен",
			'data' => [],
		];


		if (Gate::none('edit-users')) {
			abort(403);
		}

		$admin = intval($request->input('admin'));
		$active = intval($request->input('active'));
		$max_check_lists_count = intval($request->input('max_check_lists_count'));

		if ($max_check_lists_count < $user->current_check_lists_count) {
			$max_check_lists_count = $user->current_check_lists_count;
		}

		$user->admin = $admin;
		$user->active = $active;
		$user->max_check_lists_count = $max_check_lists_count;

		$user->save();
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


	
}
