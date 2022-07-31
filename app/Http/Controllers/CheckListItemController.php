<?php

namespace App\Http\Controllers;

use App\Models\CheckList;
use App\Models\CheckListItem;
use Illuminate\Http\Request;

class CheckListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
		return CheckListItem::where('check_list_id', $request->check_list)->get()->toArray();
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
			'message' => 'Пункт успешно создан!',
			'data' => []

		];
		if (! $user->active) {
			$return_data = [
				'error' => true,
				'message' => 'Вы не можете создавать пункты, потому что заблокированы!',
				'data' => []
			];
			return $return_data;
		}

		$check_list = CheckList::where('user_id', $user->id)
		->where('id', $request->check_list)
		->first();

		if (empty($check_list->id)) {
			$return_data = [
				'error' => true,
				'message' => 'Не найден Ваш чек-лист для добавления пункта!',
				'data' => []
			];
			return $return_data;
		}

		$new_checkist_item = CheckListItem::create([
			'name' => $request->name,
			'check_list_id' => $request->check_list,
			'item_number' => (CheckListItem::where('check_list_id', $request->check_list)->orderBy('item_number', 'desc')->first()->item_number ?? 0 ) + 1
		]);

		$check_list->is_done = 0;
		$check_list->save();

		$return_data['data'] = $new_checkist_item->toArray();
		return $return_data;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CheckListItem  $checkListItem
     * @return \Illuminate\Http\Response
     */
    public function show(CheckListItem $checkListItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CheckListItem  $checkListItem
     * @return \Illuminate\Http\Response
     */
    public function edit(CheckListItem $checkListItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CheckListItem  $checkListItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		$user = $request->user();
		$return_data = [
			'error' => false,
			'message' => 'Пункт успешно обновлен!',
			'data' => []
		];

		if (! $user->active) {
			$return_data = [
				'error' => true,
				'message' => 'Вы не можете изменять пункты, потому что заблокированы!',
				'data' => []
			];
			return $return_data;
		}
		
		$check_list = CheckList::where('user_id', $user->id)->find($request->check_list);
		if (empty($check_list->id)) {
			$return_data = [
				'error' => true,
				'message' => 'Не найден пункт для изменения в Ваших чек-листах!',
				'data' => []
			];
			return $return_data;
		}
		
		$item = CheckListItem::where('check_list_id',$request->check_list)
		->where('id', $request->item)
		->first();

		$item->is_done = intval($request->is_done);
		$item->save();


		$check_check_list = CheckListItem::where('check_list_id', $request->check_list)
		->where('is_done', 0)
		->first();
		$is_done_check_list = 1;

		if (! empty($check_check_list->id)) {
			$is_done_check_list = 0;
		}

		$check_list->is_done = $is_done_check_list;
		$check_list->save();


		$return_data['data']['check_list']['is_done'] = $is_done_check_list;
		return $return_data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CheckListItem  $checkListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
		$user = $request->user();
		$return_data = [
			'error' => false,
			'message' => 'Пункт успешно удален!',
			'data' => []
		];

		if (! $user->active) {
			$return_data = [
				'error' => true,
				'message' => 'Вы не можете изменять пункты, потому что заблокированы!',
				'data' => []
			];
			return $return_data;
		}

		$check_list = CheckList::where('user_id', $user->id)->where('id', $request->check_list)->first();

		if (empty($check_list->id)) {
			$return_data = [
				'error' => true,
				'message' => 'Не найден пункт для изменения в Ваших чек-листах!',
				'data' => []
			];
			return $return_data;
		}

		CheckListItem::where('check_list_id', $check_list->id)->where('id', $request->item)->delete();


		$check_check_list = CheckListItem::where('check_list_id', $request->check_list)
		->where('is_done', 0)
		->first();
		$is_done_check_list = 1;

		if (! empty($check_check_list->id)) {
			$is_done_check_list = 0;
		}

		$check_list->is_done = $is_done_check_list;
		$check_list->save();


		$return_data['data']['check_list']['is_done'] = $is_done_check_list;

		return $return_data;
    }
}
