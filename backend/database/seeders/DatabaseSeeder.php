<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Member;
use App\Models\Donation;
use App\Models\Distribution;
use App\Models\DistributionRecipient;
use App\Models\Notice;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@manobseba.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Create member users
        $users = [];
        for ($i = 1; $i <= 5; $i++) {
            $users[] = User::create([
                'name' => "Member User {$i}",
                'email' => "member{$i}@manobseba.com",
                'password' => Hash::make('password'),
                'role' => 'member',
                'is_active' => true,
            ]);
        }

        // Create members with sample data
        $villages = ['Narayanganj', 'Dhaka', 'Chittagong', 'Sylhet'];
        $members = [];
        
        $memberNames = [
            'Md. Ahmed Hassan',
            'Fatima Begum',
            'Abdul Karim',
            'Nasrin Ahmed',
            'Hasan Ali',
            'Zainab Khan',
            'Karim Uddin',
            'Amina Begum',
            'Rahman Khan',
            'Bismillah Ahmed'
        ];

        foreach ($memberNames as $idx => $name) {
            $member = Member::create([
                'user_id' => $users[$idx % count($users)]->id,
                'name' => $name,
                'email' => strtolower(str_replace(' ', '', $name)) . '@example.com',
                'phone' => '01' . rand(100000000, 999999999),
                'village' => $villages[rand(0, count($villages) - 1)],
                'address' => 'House ' . rand(1, 500) . ', ' . $villages[rand(0, count($villages) - 1)],
                'status' => rand(0, 1) ? 'Active' : 'Inactive',
                'join_date' => Carbon::now()->subMonths(rand(1, 12)),
                'total_contribution' => 0,
            ]);
            $members[] = $member;
        }

        // Create sample donations
        foreach ($members as $member) {
            for ($i = 0; $i < rand(2, 5); $i++) {
                $amount = rand(1000, 10000);
                $donation = Donation::create([
                    'member_id' => $member->id,
                    'receipt_id' => 'RCP-' . date('Y-') . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT),
                    'amount' => $amount,
                    'payment_method' => ['Cash', 'bKash', 'Nagad'][rand(0, 2)],
                    'notes' => 'Monthly contribution',
                    'donation_date' => Carbon::now()->subMonths(rand(0, 6)),
                    'recorded_by' => $admin->id,
                ]);
                
                // Update member's total contribution
                $member->total_contribution += $amount;
            }
            $member->save();
        }

        // Create sample distributions
        $programs = [
            [
                'program_name' => 'Eid-ul-Fitr Food Package',
                'description' => 'Food and essential items distribution during Eid festival',
                'total_budget' => 50000,
            ],
            [
                'program_name' => 'School Scholarship Program',
                'description' => 'Monthly scholarship support for needy students',
                'total_budget' => 60000,
            ],
            [
                'program_name' => 'Medical Aid Fund',
                'description' => 'Support for members facing medical emergencies',
                'total_budget' => 80000,
            ],
            [
                'program_name' => 'Housing Repair Assistance',
                'description' => 'Support for home repairs and maintenance',
                'total_budget' => 70000,
            ],
        ];

        foreach ($programs as $program) {
            $distribution = Distribution::create([
                'program_name' => $program['program_name'],
                'description' => $program['description'],
                'status' => ['Pending', 'In Progress', 'Completed'][rand(0, 2)],
                'total_budget' => $program['total_budget'],
                'total_spent' => 0,
                'total_recipients' => 0,
                'start_date' => Carbon::now()->subMonths(rand(0, 6)),
                'end_date' => Carbon::now()->addMonths(rand(1, 12)),
                'created_by' => $admin->id,
            ]);

            // Add recipients
            $recipientCount = rand(3, 8);
            $recipients = collect($members)->random($recipientCount);

            foreach ($recipients as $recipient) {
                $amount = rand(500, 5000);
                DistributionRecipient::create([
                    'distribution_id' => $distribution->id,
                    'member_id' => $recipient->id,
                    'amount_distributed' => $amount,
                    'remarks' => 'Distribution completed',
                    'distributed_date' => Carbon::now()->subMonths(rand(0, 3)),
                    'distributed_by' => $admin->id,
                ]);

                $distribution->total_spent += $amount;
                $distribution->total_recipients += 1;
            }

            $distribution->save();
        }

        // Create sample notices
        $notices = [
            [
                'title' => 'Board Meeting Scheduled',
                'content' => 'The management board meeting is scheduled for May 20th at 3:00 PM. All members are requested to attend.',
                'priority' => 'High',
            ],
            [
                'title' => 'Eid Festival Celebration',
                'content' => 'Community Eid celebration will be held on April 11th. Join us for prayers and community feast.',
                'priority' => 'Medium',
            ],
            [
                'title' => 'Fund Update for Medical Emergency',
                'content' => 'Urgent collection for medical emergency. Contributions can be made via bKash or Cash.',
                'priority' => 'High',
            ],
            [
                'title' => 'Monthly Collection Reminder',
                'content' => 'Please ensure monthly fund contributions are paid by the 25th of each month.',
                'priority' => 'Low',
            ],
        ];

        foreach ($notices as $notice) {
            Notice::create([
                'title' => $notice['title'],
                'content' => $notice['content'],
                'priority' => $notice['priority'],
                'is_active' => true,
                'posted_by' => $admin->id,
                'published_date' => Carbon::now()->subDays(rand(1, 30)),
                'expires_at' => Carbon::now()->addDays(rand(30, 90)),
            ]);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin Email: admin@manobseba.com');
        $this->command->info('Admin Password: password');
    }
}
