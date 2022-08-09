# Сервис чек-листов

Малыхина Александра Алексеевна

Тестовое задание на PHP (Laravel 8, Vue2, MySQL)

## Описание проекта

В приложении есть обычные пользователи и администраторы (пользователи с расширенными правами).<br>
Пользователь может просматривать свои чек-листы и редактировать их, если не заблокирован. Пользователь может создать определенное количесвто чек-листов. По умолчанию пользователю можно создать до 5 чек-листов, администратор может изменить максимальное кол-во чек-листов для пользователя.

Администраторы - пользователи с доп. правами. В системе есть сущности (то над чем админитсраторы или пользователи могут производить действия, например "пользователи", "чек-листы", "права администратора" и т.д.) и действия над этими сущностями - "создание", "удаление", "просмотр", "редактирование". 
<br>Администратор, обладая определенными правами над сущностями, может производить разрешенные действия над нимим. 

## Описание, как запустить проект

Для запуска проекта необходимо создать БД и прописать информацию для ее подключения в .env

Так же в файле .env указать имя проекта и APP_URL. 
обновить зависимости: 

``` npm i ```

``` composer install ```

Для сборки всего проекта потребется выполнить команду:

``` php artisan project:build ```

Эта команда выполнит все миграции и заполнит таблицы первоначальными данными. И создаст первого пользователя - администратора со всеми правами.

##  Информация о доступах 

После выполнения команды по заполнению проекта создается администратор. Зайти под его именем можно.

email: admin@mail.ru

password: 123123123

