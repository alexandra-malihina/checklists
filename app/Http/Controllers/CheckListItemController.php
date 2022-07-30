<?php

namespace App\Http\Controllers;

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
		
		$new_checkist_item = CheckListItem::create([
			'name' => $request->name,
			'check_list_id' => $request->check_list,
			'item_number' => (CheckListItem::where('check_list_id', $request->check_list)->orderBy('item_number', 'desc')->first()->item_number ?? 0 ) + 1
		]);

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
    public function update(Request $request, CheckListItem $checkListItem)
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
		
		$item = CheckListItem::where('check_list_id',$request->check_list)
		->where('id', $request->item)
		->first();

		$item->is_done = intval($request->is_done);

		$item->save();

		return $return_data;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CheckListItem  $checkListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(CheckListItem $checkListItem)
    {
        //
    }
}
