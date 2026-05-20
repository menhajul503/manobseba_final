<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            // Add father_name / mother_name if they don't exist yet
            if (!Schema::hasColumn('members', 'father_name')) {
                $table->string('father_name')->nullable()->after('name');
            }
            if (!Schema::hasColumn('members', 'mother_name')) {
                $table->string('mother_name')->nullable()->after('father_name');
            }

            // Add English name columns
            if (!Schema::hasColumn('members', 'father_name_en')) {
                $table->string('father_name_en')->nullable()->after('father_name');
            }
            if (!Schema::hasColumn('members', 'mother_name_en')) {
                $table->string('mother_name_en')->nullable()->after('father_name_en');
            }
        });
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            if (Schema::hasColumn('members', 'father_name_en')) {
                $table->dropColumn('father_name_en');
            }
            if (Schema::hasColumn('members', 'mother_name_en')) {
                $table->dropColumn('mother_name_en');
            }
            // keep father_name/mother_name columns to avoid data loss rollback complexity
        });
    }
};
