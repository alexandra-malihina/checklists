<?php

namespace App\Providers;

use App\Helpers\UserHelper;
use App\Models\Action;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();



		//users
		Gate::define('edit-users', function (User $user) {
			$actions = UserHelper::getAuthUserActions($user);
			return !empty($actions['edit']['users']);
		});
		Gate::define('view-users', function (User $user) {
			$actions = UserHelper::getAuthUserActions($user);
			return !empty($actions['view']['users']);
		});

		
		//checlists

		Gate::define('view-checlists', function (User $user) {
			$actions = UserHelper::getAuthUserActions($user);
			return !empty($actions['view']['checlists']);
		});




		//roles
		Gate::define('edit-roles', function (User $user) {
			$actions = UserHelper::getAuthUserActions($user);
			return !empty($actions['edit']['roles']);
		});
		Gate::define('view-roles', function (User $user) {
			$actions = UserHelper::getAuthUserActions($user);
			return !empty($actions['view']['roles']);
		});
    }
}
