<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class BuildProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:build';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Первый запуск проекта. Запуск миграций и заполнение таблиц необходимыми данными.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
		$this->info('Начало выполнения команды');
		$this->info('Запуск миграций...');

		$this->call('migrate');

		$this->info('Вставка данных по умолчанию...');

		$this->call('db:seed', ['--class' => 'ActionSeeder']);
		$this->call('db:seed', ['--class' => 'EntitySeeder']);
		$this->call('db:seed', ['--class' => 'FirstUserSeeder']);



		$this->info('Завершение выполнения команды');
        return 0;
    }
}
