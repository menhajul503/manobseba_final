<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('distribution_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('distribution_id')->constrained()->onDelete('cascade');
            $table->foreignId('member_id')->constrained()->onDelete('cascade');
            $table->decimal('amount_distributed', 12, 2);
            $table->text('remarks')->nullable();
            $table->timestamp('distributed_date');
            $table->foreignId('distributed_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();

            $table->unique(['distribution_id', 'member_id']);
            $table->index('distributed_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('distribution_recipients');
    }
};
