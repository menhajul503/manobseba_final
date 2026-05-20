<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'user_id',
        'name',
        'father_name',
        'father_name_en',
        'mother_name',
        'mother_name_en',
        'email',
        'phone',
        'village',
        'address',
        'status',
        'role',
        'image',
        'join_date',
        'total_contribution',
        'notes'
    ];

    protected $casts = [
        'join_date' => 'date',
        'total_contribution' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function distributions()
    {
        return $this->hasMany(DistributionRecipient::class);
    }

    protected static function booted()
    {
        static::created(function (Member $member) {
            if (empty($member->member_id)) {
                // Generate a human-friendly unique member id: MBR{YEAR}{zero-padded-member-id}
                $memberId = 'MBR' . date('Y') . str_pad($member->id, 6, '0', STR_PAD_LEFT);
                $member->member_id = $memberId;
                // Save without firing events again
                $member->saveQuietly();
            }
        });
    }
}
