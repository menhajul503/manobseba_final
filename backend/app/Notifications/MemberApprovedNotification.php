<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;
use App\Models\Member;

class MemberApprovedNotification extends Notification
{
    use Queueable;

    protected $member;

    public function __construct(Member $member)
    {
        $this->member = $member;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => 'member_approved',
            'member_id' => $this->member->id,
            'member_name' => $this->member->name,
            'message' => 'Your membership has been approved. You can now log in.',
        ];
    }
}
