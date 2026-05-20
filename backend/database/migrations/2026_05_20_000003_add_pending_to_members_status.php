<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // For MySQL alter the enum to include Pending
        try {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE `members` MODIFY `status` ENUM('Pending','Active','Inactive') NOT NULL DEFAULT 'Pending'");
        } catch (\Throwable $e) {
            // On other drivers or if fail, add a string column fallback
            if (!Schema::hasColumn('members', 'approval_status')) {
                Schema::table('members', function (Blueprint $table) {
                    $table->string('approval_status')->default('Pending');
                });
            }
        }
    }

    public function down(): void
    {
        try {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE `members` MODIFY `status` ENUM('Active','Inactive') NOT NULL DEFAULT 'Active'");
        } catch (\Throwable $e) {
            if (Schema::hasColumn('members', 'approval_status')) {
                Schema::table('members', function (Blueprint $table) {
                    $table->dropColumn('approval_status');
                });
            }
        }
    }
};
