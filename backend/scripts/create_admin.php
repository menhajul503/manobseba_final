<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$email = 'msmenhajulislam203@gmail.com';
$password = 'ms01737.';
$name = 'Ms Menhajul Islam';

$user = User::updateOrCreate(
    ['email' => $email],
    [
        'name' => $name,
        'password' => Hash::make($password),
        'role' => 'admin',
        'is_active' => true,
    ]
);

echo "OK: user id=" . $user->id . "\n";
