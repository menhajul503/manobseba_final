<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_name',
        'description',
        'status',
        'total_budget',
        'total_spent',
        'total_recipients',
        'start_date',
        'end_date',
        'created_by'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'total_budget' => 'decimal:2',
        'total_spent' => 'decimal:2',
    ];

    public function recipients()
    {
        return $this->hasMany(DistributionRecipient::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function calculateProgress()
    {
        return $this->total_budget > 0 
            ? (($this->total_spent / $this->total_budget) * 100)
            : 0;
    }

    public function getRemainingBudget()
    {
        return $this->total_budget - $this->total_spent;
    }
}
