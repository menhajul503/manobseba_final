<?php

namespace App\Http\Controllers\Api;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MemberController
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 100);
        // By default return only active (approved) members. Admins can request all by adding ?all=1
        $query = Member::with('user');
        $showAll = $request->query('all') == '1';
        if (!$showAll || !$request->user() || !in_array($request->user()->role, ['admin', 'sub-admin'])) {
            $query->where('status', 'Active');
        }

        $members = $query->paginate($perPage);
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members',
            'phone' => 'nullable|string|max:20',
            'village' => 'required|string|max:100',
            'address' => 'nullable|string',
            'status' => 'sometimes|in:Active,Inactive',
            'role' => 'sometimes|in:Support,Admin',
            'image' => 'nullable|string',
            'join_date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $validated['user_id'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'Active';
        $validated['role'] = $validated['role'] ?? 'Support';

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
            'role' => 'sometimes|in:Support,Admin',
            'image' => 'nullable|string',
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

    public function getByVillage(Request $request, $village): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 100);
        $members = Member::where('village', $village)->paginate($perPage);
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
