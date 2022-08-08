<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAction extends Model
{
	protected $table = 'user_action';
	public $timestamps = false;

	protected $fillable = ['user_id', 'action_id', 'entity_id'];
	// protected $width = ['action', 'entity'];


	public function action() {
		return $this->belongsTo(Action::class);
	}

	public function entity() {
		return $this->belongsTo(Entity::class);
	}
}
