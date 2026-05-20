<?php

namespace App\Http\Controllers\Api\Admin;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Member;
use App\Models\User;
use App\Notifications\MemberApprovedNotification;

class MemberApprovalController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    protected function authorizeAdmin(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'sub-admin'])) {
            abort(403, 'Forbidden');
        }
    }

    public function pending(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $pending = Member::where('status', 'Pending')->with('user')->get();

        return response()->json(['success' => true, 'data' => $pending]);
    }

    public function approve(Request $request, $id): JsonResponse
    {
        $this->authorizeAdmin($request);

        $member = Member::findOrFail($id);

        $member->status = 'Active';
        $member->join_date = $member->join_date ?? now()->toDateString();
        $member->save();

        // Activate linked user
        if ($member->user) {
            $member->user->is_active = true;
            $member->user->save();

            // Notify the member
            try {
                $member->user->notify(new MemberApprovedNotification($member));
            } catch (\Throwable $e) {
                // ignore notification errors
            }
        }

        return response()->json(['success' => true, 'message' => 'Member approved', 'data' => $member]);
    }
}
