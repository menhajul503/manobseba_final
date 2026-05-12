<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistributionRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'distribution_id',
        'member_id',
        'amount_distributed',
        'remarks',
        'distributed_date',
        'distributed_by'
    ];

    protected $casts = [
        'distributed_date' => 'datetime',
        'amount_distributed' => 'decimal:2',
    ];

    public function distribution()
    {
        return $this->belongsTo(Distribution::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function distributedBy()
    {
        return $this->belongsTo(User::class, 'distributed_by');
    }
}
