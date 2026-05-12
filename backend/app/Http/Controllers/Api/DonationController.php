<?php

namespace App\Http\Controllers\Api;

use App\Models\Donation;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class DonationController
{
    public function index(): JsonResponse
    {
        $donations = Donation::with(['member', 'recordedBy'])
            ->orderBy('donation_date', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $donations
        ]);
    }

    public function show($id): JsonResponse
    {
        $donation = Donation::with(['member', 'recordedBy'])->find($id);

        if (!$donation) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $donation
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:Cash,bKash,Nagad,Bank Transfer',
            'notes' => 'nullable|string',
            'donation_date' => 'required|date',
        ]);

        $validated['receipt_id'] = 'RCP-' . date('Y-') . Str::random(8);
        $validated['recorded_by'] = auth()->id();

        $donation = Donation::create($validated);

        // Update member's total contribution
        $member = Member::find($validated['member_id']);
        $member->total_contribution += $validated['amount'];
        $member->save();

        return response()->json([
            'success' => true,
            'message' => 'Donation recorded successfully',
            'data' => $donation->load(['member', 'recordedBy'])
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found'
            ], 404);
        }

        $validated = $request->validate([
            'amount' => 'sometimes|numeric|min:0.01',
            'payment_method' => 'sometimes|in:Cash,bKash,Nagad,Bank Transfer',
            'notes' => 'nullable|string',
            'donation_date' => 'sometimes|date',
        ]);

        // Handle amount change
        if (isset($validated['amount']) && $validated['amount'] != $donation->amount) {
            $oldAmount = $donation->amount;
            $difference = $validated['amount'] - $oldAmount;
            
            $member = $donation->member;
            $member->total_contribution += $difference;
            $member->save();
        }

        $donation->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Donation updated successfully',
            'data' => $donation
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found'
            ], 404);
        }

        // Revert member's total contribution
        $member = $donation->member;
        $member->total_contribution -= $donation->amount;
        $member->save();

        $donation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Donation deleted successfully'
        ]);
    }

    public function getTotalDonations(): JsonResponse
    {
        $total = Donation::sum('amount');

        return response()->json([
            'success' => true,
            'data' => ['total' => $total ?? 0]
        ]);
    }

    public function getMonthlyDonations(): JsonResponse
    {
        $monthly = Donation::selectRaw('DATE_FORMAT(donation_date, "%Y-%m") as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $monthly
        ]);
    }

    public function getByPaymentMethod($method): JsonResponse
    {
        $donations = Donation::where('payment_method', $method)
            ->with(['member', 'recordedBy'])
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $donations
        ]);
    }
}
