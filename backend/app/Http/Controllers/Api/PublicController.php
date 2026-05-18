<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Donation;
use App\Models\Notice;
use Illuminate\Support\Facades\Storage;

class PublicController extends Controller
{
    public function index(Request $request)
    {
        // Members - public subset
        $members = Member::select('id', 'name', 'phone', 'email', 'avatar')->take(12)->get()->map(function ($m) {
            return [
                'id' => $m->id,
                'name' => $m->name,
                'phone' => $m->phone,
                'email' => $m->email,
                'avatar' => $m->avatar ? asset('storage/' . ltrim($m->avatar, '/')) : null,
            ];
        });

        // Basic stats
        $totalFund = (float) Donation::sum('amount');
        $villages = Member::distinct('village')->count('village');
        $volunteers = Member::count();

        // Active notices
        $notices = Notice::where('active', 1)->orderBy('created_at', 'desc')->take(6)->get()->map(function ($n) {
            return [
                'id' => $n->id,
                'title' => $n->title ?? '',
                'message' => $n->message ?? '',
                'image' => $n->image ? asset('storage/' . ltrim($n->image, '/')) : null,
            ];
        });

        // Hero slides: prefer notice images if available
        $slides = $notices->filter(function ($n) { return !empty($n['image']); })->values();
        if ($slides->isEmpty()) {
            // fallback to a few curated slides
            $slides = collect([
                [
                    'title' => 'Strengthening Communities Through Compassionate Care',
                    'description' => 'Join Manobseba in providing essential support to families and mosques across the region.',
                    'image' => 'https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=2000&q=80'
                ],
                [
                    'title' => 'A Noble Path to Charity and Service',
                    'description' => 'Your donation helps fund zakat distribution, education and emergency support.',
                    'image' => 'https://images.unsplash.com/photo-1553142355-77f16dbba4ab?auto=format&fit=crop&w=2000&q=80'
                ]
            ]);
        }

        return response()->json([
            'members' => $members,
            'stats' => [
                'total_fund' => $totalFund,
                'villages' => $villages,
                'volunteers' => $volunteers,
            ],
            'notices' => $notices,
            'slides' => $slides,
        ]);
    }
}
