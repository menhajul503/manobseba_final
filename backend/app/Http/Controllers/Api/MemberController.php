<?php

namespace App\Http\Controllers\Api;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MemberController
{
    public function index(): JsonResponse
    {
        $members = Member::with('user')->paginate(15);
        return response()->json([
            'success' => true,
            'data' => $members
        ]);
    }

    public function show($id): JsonResponse
    {
        $member = Member::with(['user', 'donations', 'distributions'])->find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $member
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'phone' => 'nullable|string|max:20',
            'village' => 'required|string|max:100',
            'address' => 'nullable|string',
            'join_date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $member = Member::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Member created successfully',
            'data' => $member
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:members,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'village' => 'sometimes|string|max:100',
            'address' => 'nullable|string',
            'status' => 'sometimes|in:Active,Inactive',
            'notes' => 'nullable|string'
        ]);

        $member->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Member updated successfully',
            'data' => $member
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found'
            ], 404);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Member deleted successfully'
        ]);
    }

    public function getByVillage($village): JsonResponse
    {
        $members = Member::where('village', $village)->paginate(15);
        return response()->json([
            'success' => true,
            'data' => $members
        ]);
    }

    public function getActiveCount(): JsonResponse
    {
        $count = Member::where('status', 'Active')->count();
        return response()->json([
            'success' => true,
            'data' => ['count' => $count]
        ]);
    }
}
