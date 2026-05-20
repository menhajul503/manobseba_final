<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'member',
            'is_active' => false, // inactive until admin approves
        ]);

        // Create associated member record in pending status
        $memberData = [
            'user_id' => $user->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'village' => 'Not Specified',
            'status' => 'Pending',
            'join_date' => now()->toDateString(),
        ];

        // Optional parent/extra fields
        foreach (['father_name', 'father_name_en', 'mother_name', 'mother_name_en', 'emergency_contact'] as $f) {
            if ($request->filled($f)) {
                $memberData[$f] = $request->input($f);
            }
        }

        $member = Member::create($memberData);

        // Notify all admins and sub-admins about new pending member
        try {
            $admins = User::whereIn('role', ['admin', 'sub-admin'])->get();
            if ($admins->isNotEmpty()) {
                foreach ($admins as $admin) {
                    $admin->notify(new \App\Notifications\NewMemberApprovalRequest($member));
                }
            }
        } catch (\Throwable $e) {
            // swallow notification errors to not break registration
        }

        return response()->json([
            'success' => true,
            'message' => 'Registration submitted and is pending admin approval',
            'data' => [
                'user' => $user,
                'member' => $member,
            ]
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'identifier' => 'required|string', // email or phone or member_id
            'password' => 'required|string',
        ]);

        $identifier = $validated['identifier'];

        // Try find by email on users
        $user = User::where('email', $identifier)->first();

        // If not found by email, try member phone or member_id
        if (!$user) {
            $member = Member::where('phone', $identifier)->orWhere('member_id', $identifier)->first();
            if ($member) {
                $user = $member->user;
            }
        }

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated'
            ], 403);
        }

        // Revoke existing tokens
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }

    public function notifications(Request $request): JsonResponse
    {
        $user = $request->user();
        $notes = $user->notifications()->orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $notes]);
    }

    public function markNotificationRead(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        $note = $user->notifications()->where('id', $id)->first();
        if (!$note) {
            return response()->json(['success' => false, 'message' => 'Notification not found'], 404);
        }
        $note->markAsRead();
        return response()->json(['success' => true, 'message' => 'Notification marked as read']);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->user()->id,
            'current_password' => 'required_with:password|string',
            'password' => 'sometimes|string|min:8|confirmed|different:current_password',
        ]);

        $user = $request->user();

        // Check current password if changing password
        if (isset($validated['password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect'
                ], 422);
            }
            $validated['password'] = Hash::make($validated['password']);
            unset($validated['current_password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
}
