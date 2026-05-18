<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\DistributionController;
use App\Http\Controllers\Api\NoticeController;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::get('/dashboard', [DashboardController::class, 'summary']);

    // Members routes
    Route::apiResource('members', MemberController::class);
    Route::get('/members/village/{village}', [MemberController::class, 'getByVillage']);
    Route::get('/statistics/active-members', [MemberController::class, 'getActiveCount']);

    // Donations routes
    Route::apiResource('donations', DonationController::class);
    Route::get('/donations/method/{method}', [DonationController::class, 'getByPaymentMethod']);
    Route::get('/statistics/total-donations', [DonationController::class, 'getTotalDonations']);
    Route::get('/statistics/monthly-donations', [DonationController::class, 'getMonthlyDonations']);

    // Distributions routes
    Route::apiResource('distributions', DistributionController::class);
    Route::post('/distributions/{id}/recipients', [DistributionController::class, 'addRecipient']);
    Route::get('/statistics/total-distributed', [DistributionController::class, 'getTotalDistributed']);
    Route::get('/statistics/fund-calculation', [DistributionController::class, 'calculateFund']);

    // Notices routes
    Route::apiResource('notices', NoticeController::class);
    Route::get('/notices/active/list', [NoticeController::class, 'getActive']);
    Route::patch('/notices/{id}/toggle-active', [NoticeController::class, 'toggleActive']);
});

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
