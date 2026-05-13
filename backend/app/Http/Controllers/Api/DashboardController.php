<?php

namespace App\Http\Controllers\Api;

use App\Models\Donation;
use App\Models\Distribution;
use App\Models\DistributionRecipient;
use App\Models\Member;
use App\Models\Notice;
use Illuminate\Http\JsonResponse;

class DashboardController
{
    public function summary(): JsonResponse
    {
        $totalMembers = Member::count();
        $activeMembers = Member::where('status', 'Active')->count();
        $totalDonations = Donation::sum('amount') ?? 0;
        $totalDistributed = Distribution::sum('total_spent') ?? 0;
        $totalFund = $totalDonations - $totalDistributed;

        $monthlyDonations = Donation::selectRaw('DATE_FORMAT(donation_date, "%b %Y") as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderByRaw('MIN(donation_date) desc')
            ->limit(6)
            ->get()
            ->reverse()
            ->map(fn ($row) => [
                'month' => $row->month,
                'total' => (float) $row->total,
            ])
            ->values();

        $monthlyExpenses = DistributionRecipient::selectRaw('DATE_FORMAT(distributed_date, "%b %Y") as month, SUM(amount_distributed) as total')
            ->groupBy('month')
            ->orderByRaw('MIN(distributed_date) desc')
            ->limit(6)
            ->get()
            ->reverse()
            ->map(fn ($row) => [
                'month' => $row->month,
                'total' => (float) $row->total,
            ])
            ->values();

        $recentDonations = Donation::with('member')
            ->orderBy('donation_date', 'desc')
            ->limit(3)
            ->get()
            ->map(fn ($donation) => [
                'id' => 'donation-' . $donation->id,
                'type' => 'Donation',
                'description' => 'Received from ' . ($donation->member?->name ?? 'Unknown'),
                'amount' => '৳' . number_format($donation->amount, 2),
                'date' => $donation->donation_date->format('Y-m-d h:i A'),
                'status' => 'Completed',
            ]);

        $recentDistributions = DistributionRecipient::with(['member', 'distribution'])
            ->orderBy('distributed_date', 'desc')
            ->limit(2)
            ->get()
            ->map(fn ($recipient) => [
                'id' => 'distribution-' . $recipient->id,
                'type' => 'Distribution',
                'description' => 'Distributed to ' . ($recipient->member?->name ?? 'Unknown') . ' for ' . ($recipient->distribution?->program_name ?? 'Program'),
                'amount' => '৳' . number_format($recipient->amount_distributed, 2),
                'date' => $recipient->distributed_date?->format('Y-m-d h:i A') ?? now()->format('Y-m-d h:i A'),
                'status' => 'Completed',
            ]);

        $recentMembers = Member::orderBy('join_date', 'desc')
            ->limit(2)
            ->get()
            ->map(fn ($member) => [
                'id' => 'member-' . $member->id,
                'type' => 'Member',
                'description' => 'New member added: ' . $member->name,
                'amount' => '-',
                'date' => $member->join_date->format('Y-m-d h:i A'),
                'status' => $member->status,
            ]);

        $recentNotices = Notice::orderBy('published_date', 'desc')
            ->limit(2)
            ->get()
            ->map(fn ($notice) => [
                'id' => 'notice-' . $notice->id,
                'type' => 'Notice',
                'description' => $notice->title,
                'amount' => '-',
                'date' => $notice->published_date->format('Y-m-d h:i A'),
                'status' => $notice->is_active ? 'Active' : 'Inactive',
            ]);

        $recentActivities = collect()
            ->concat($recentDonations)
            ->concat($recentDistributions)
            ->concat($recentMembers)
            ->concat($recentNotices)
            ->sortByDesc('date')
            ->take(5)
            ->values()
            ->all();

        $months = [];
        $incomeData = [];
        $expenseData = [];

        $monthLabels = collect($monthlyDonations)
            ->pluck('month')
            ->merge(collect($monthlyExpenses)->pluck('month'))
            ->unique()
            ->values();

        foreach ($monthLabels as $month) {
            $months[] = $month;
            $monthDonation = collect($monthlyDonations)->firstWhere('month', $month);
            $monthExpense = collect($monthlyExpenses)->firstWhere('month', $month);

            $incomeData[] = (float) ($monthDonation['total'] ?? 0);
            $expenseData[] = (float) ($monthExpense['total'] ?? 0);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_members' => $totalMembers,
                    'active_members' => $activeMembers,
                    'total_donations' => (float) $totalDonations,
                    'total_distributions' => (float) $totalDistributed,
                    'total_fund' => (float) $totalFund,
                ],
                'chart' => [
                    'months' => $months,
                    'incomeData' => $incomeData,
                    'expenseData' => $expenseData,
                ],
                'recentActivities' => $recentActivities,
            ],
        ]);
    }
}
