<?php

namespace App\Http\Controllers;

use App\Http\Resources\CheckListResource;
use App\Models\CheckList;
use Illuminate\Http\Request;

class CheckListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		return CheckList::where('user_id', $request->user()->id)->get()->toArray();
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
		$user = $request->user();
		$return_data = [
			'error' => false,
			'message' => 'Чек-лист успешно создан!',
			'data' => []

		];
		if (! $user->active) {
			$return_data = [
				'error' => true,
				'message' => 'Вы не можете создавать чек-листы, потому что заблокированы!',
				'data' => []
			];
			return $return_data;
		}
		if ($user->max_check_lists_count <= $user->current_check_lists_count) {
			$return_data = [
				'error' => true,
				'message' => 'Вы не можете сделать более ' . $user->max_check_lists_count .' чек-листов!',
				'data' => []
			];
			return $return_data;
		}

		$new_checkist = CheckList::create([
			'name' => $request->name,
			'user_id' => $user->id
		]);

		$user->current_check_lists_count++;
		$user->save();
		$return_data['data'] = $new_checkist->toArray();
		return $return_data;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CheckListModel  $checkListModel
     * @return \Illuminate\Http\Response
     */
    public function show(CheckList $checkListModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CheckListModel  $checkListModel
     * @return \Illuminate\Http\Response
     */
    public function edit(CheckList $checkListModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CheckListModel  $checkListModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CheckList $checkListModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CheckListModel  $checkListModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(CheckList $checkList, Request $request)
    {
        $user = $request->user();
		$return_data = [
			'error' => false,
			'message' => 'Чек-лист успешно удален!',
			'data' => []
		];

		if ($checkList->user_id !== $user->id) {
			$return_data = [
				'error' => true,
				'message' => 'Вы можете удалять только собственные чек-листы!',
				'data' => []
			];
		}
		else {
			$checkList->delete();
		}

		$user->current_check_lists_count--;
		$user->save();
		return $return_data;
    }
}
