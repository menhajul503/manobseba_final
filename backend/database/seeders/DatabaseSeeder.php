<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Member;
use App\Models\Donation;
use App\Models\Distribution;
use App\Models\DistributionRecipient;
use App\Models\Notice;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Database seeding is disabled. All data must be entered through the application UI.
    }
}
