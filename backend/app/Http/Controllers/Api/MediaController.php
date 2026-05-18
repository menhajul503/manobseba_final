<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $files = Storage::disk('public')->files('media');
        $media = [];

        foreach ($files as $file) {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $type = in_array($ext, ['mp4', 'webm', 'ogg']) ? 'video' : (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']) ? 'image' : 'other');
            if ($type === 'other') continue;

            $media[] = [
                'path' => $file,
                'url' => asset('storage/' . $file),
                'type' => $type,
                'name' => basename($file),
            ];
        }

        return response()->json(['data' => $media]);
    }
}
