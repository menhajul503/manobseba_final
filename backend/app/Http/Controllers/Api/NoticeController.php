<?php

namespace App\Http\Controllers\Api;

use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NoticeController
{
    public function index(): JsonResponse
    {
        $notices = Notice::with('postedBy')
            ->orderBy('published_date', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $notices
        ]);
    }

    public function getActive(): JsonResponse
    {
        $notices = Notice::where('is_active', true)
            ->with('postedBy')
            ->orderBy('published_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notices
        ]);
    }

    public function show($id): JsonResponse
    {
        $notice = Notice::with('postedBy')->find($id);

        if (!$notice) {
            return response()->json([
                'success' => false,
                'message' => 'Notice not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $notice
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'priority' => 'required|in:Low,Medium,High',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $validated['posted_by'] = auth()->id();
        $validated['published_date'] = now();
        $validated['is_active'] = true;

        $notice = Notice::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Notice posted successfully',
            'data' => $notice->load('postedBy')
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $notice = Notice::find($id);

        if (!$notice) {
            return response()->json([
                'success' => false,
                'message' => 'Notice not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'priority' => 'sometimes|in:Low,Medium,High',
            'is_active' => 'sometimes|boolean',
            'expires_at' => 'nullable|date|after:now',
        ]);

        $notice->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Notice updated successfully',
            'data' => $notice
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $notice = Notice::find($id);

        if (!$notice) {
            return response()->json([
                'success' => false,
                'message' => 'Notice not found'
            ], 404);
        }

        $notice->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notice deleted successfully'
        ]);
    }

    public function toggleActive($id): JsonResponse
    {
        $notice = Notice::find($id);

        if (!$notice) {
            return response()->json([
                'success' => false,
                'message' => 'Notice not found'
            ], 404);
        }

        $notice->is_active = !$notice->is_active;
        $notice->save();

        return response()->json([
            'success' => true,
            'message' => 'Notice status updated',
            'data' => $notice
        ]);
    }
}
