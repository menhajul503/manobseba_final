<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
            $table->boolean('is_active')->default(true);
            $table->foreignId('posted_by')->constrained('users')->onDelete('restrict');
            $table->timestamp('published_date');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index('is_active');
            $table->index('published_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notices');
    }
};
