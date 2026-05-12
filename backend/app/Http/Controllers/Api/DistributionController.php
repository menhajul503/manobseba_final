<?php

namespace App\Http\Controllers\Api;

use App\Models\Distribution;
use App\Models\DistributionRecipient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DistributionController
{
    public function index(): JsonResponse
    {
        $distributions = Distribution::with(['createdBy', 'recipients'])
            ->orderBy('start_date', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $distributions
        ]);
    }

    public function show($id): JsonResponse
    {
        $distribution = Distribution::with(['createdBy', 'recipients.member'])->find($id);

        if (!$distribution) {
            return response()->json([
                'success' => false,
                'message' => 'Distribution not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $distribution
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'program_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'total_budget' => 'required|numeric|min:0.01',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['status'] = 'Pending';

        $distribution = Distribution::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Distribution program created successfully',
            'data' => $distribution
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $distribution = Distribution::find($id);

        if (!$distribution) {
            return response()->json([
                'success' => false,
                'message' => 'Distribution not found'
            ], 404);
        }

        $validated = $request->validate([
            'program_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'total_budget' => 'sometimes|numeric|min:0.01',
            'status' => 'sometimes|in:Pending,In Progress,Completed',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $distribution->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Distribution updated successfully',
            'data' => $distribution
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $distribution = Distribution::find($id);

        if (!$distribution) {
            return response()->json([
                'success' => false,
                'message' => 'Distribution not found'
            ], 404);
        }

        $distribution->delete();

        return response()->json([
            'success' => true,
            'message' => 'Distribution deleted successfully'
        ]);
    }

    public function addRecipient(Request $request, $id): JsonResponse
    {
        $distribution = Distribution::find($id);

        if (!$distribution) {
            return response()->json([
                'success' => false,
                'message' => 'Distribution not found'
            ], 404);
        }

        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'amount_distributed' => 'required|numeric|min:0.01',
            'remarks' => 'nullable|string',
            'distributed_date' => 'required|date',
        ]);

        $validated['distributed_by'] = auth()->id();
        $validated['distribution_id'] = $id;

        $recipient = DistributionRecipient::create($validated);

        // Update distribution totals
        $distribution->total_spent += $validated['amount_distributed'];
        $distribution->total_recipients += 1;
        $distribution->save();

        return response()->json([
            'success' => true,
            'message' => 'Recipient added successfully',
            'data' => $recipient
        ], 201);
    }

    public function getTotalDistributed(): JsonResponse
    {
        $total = Distribution::sum('total_spent');

        return response()->json([
            'success' => true,
            'data' => ['total' => $total ?? 0]
        ]);
    }

    public function calculateFund(): JsonResponse
    {
        // Total Fund = Total Donations - Total Distributions
        $totalDonations = \DB::table('donations')->sum('amount') ?? 0;
        $totalDistributions = \DB::table('distributions')->sum('total_spent') ?? 0;
        $totalFund = $totalDonations - $totalDistributions;

        return response()->json([
            'success' => true,
            'data' => [
                'total_donations' => $totalDonations,
                'total_distributions' => $totalDistributions,
                'total_fund' => $totalFund
            ]
        ]);
    }
}
