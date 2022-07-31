<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckList extends Model
{
	protected $table = 'check_lists';
	protected $fillable = [
        'name',
		'user_id'
    ];

	public function items() {
		return $this->hasMany(CheckListItem::class);
	}
}
