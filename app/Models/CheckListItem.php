<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckListItem extends Model
{
	protected $table = 'checklist_items';
	protected $fillable = [
		'item_number',
		'name',
		'is_done',
		'check_list_id'
	];
}
