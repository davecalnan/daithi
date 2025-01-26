<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nappies', function (Blueprint $table) {
            $table->id();

            $table->boolean('is_wet')->default(false);
            $table->boolean('is_dirty')->default(false);
            $table->text('notes')->nullable();

            $table->timestamp('changed_at');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nappies');
    }
};
