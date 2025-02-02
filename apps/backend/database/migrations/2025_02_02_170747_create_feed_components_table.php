<?php

use App\Data\FeedSource;
use App\Data\FoodType;
use App\Models\Feed;
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
        Schema::create('feed_components', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Feed::class)->constrained()->cascadeOnDelete();

            $table->enum('source', [
                FeedSource::BOTTLE->value,
                FeedSource::LEFT_BREAST->value,
                FeedSource::RIGHT_BREAST->value,
            ]);

            $table->enum('type', [
                FoodType::BREAST_MILK->value,
                FoodType::FORMULA->value,
            ]);

            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at');

            $table->unsignedInteger('volume')->nullable();
            $table->string('volume_unit')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feed_components');
    }
};
