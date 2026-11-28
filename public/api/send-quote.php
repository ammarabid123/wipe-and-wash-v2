<?php
/*
  Quote request mailer for Hostinger (PHP).
  Upload path: public_html/api/send-quote.php   (Vite copies public/api/ into dist/api/ automatically)

  The website still opens WhatsApp first. This script is only a backup copy of the request, sent to your email.
  1) Create a mailbox on your own domain in Hostinger hPanel -> Emails (for example no-reply@wipeandwash.com).
  2) Change the two lines below, then rebuild and upload.
*/
const TO_EMAIL   = 'info@wipeandwash.com'; // where quote requests should arrive
const FROM_EMAIL = 'no-reply@wipeandwash.com';  // must be an email on YOUR domain, otherwise mail often lands in spam

const MAX_REQUESTS_PER_HOUR = 15;               // per visitor IP, stops mail flooding

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply($code, $body) {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

function clean($value, $max) {
    $value = is_string($value) ? $value : '';
    $value = preg_replace('/[\r\n\t]+/', ' ', $value);   // no line breaks: blocks email header injection
    $value = trim(strip_tags($value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only accept requests that come from this same website
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $normalize = function ($host) { return preg_replace('/^www\./i', '', strtolower((string) $host)); };
    if ($normalize(parse_url($origin, PHP_URL_HOST)) !== $normalize(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''))) {
        reply(403, ['ok' => false, 'error' => 'origin']);
    }
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 4096) {
    reply(413, ['ok' => false, 'error' => 'size']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'json']);
}

// Hidden "website" field: real visitors never see it, bots fill it in. Pretend success and drop it.
if (!empty($data['website'])) {
    reply(200, ['ok' => true]);
}

$name     = clean($data['name'] ?? '', 80);
$phone    = clean($data['phone'] ?? '', 20);
$capacity = clean($data['capacity'] ?? '', 40);
$location = clean($data['location'] ?? '', 100);

$digits = preg_replace('/^00/', '', preg_replace('/\D/', '', $phone));
if ($name === '' || $location === '' || !preg_match('/^(92|0)?3\d{9}$/', $digits)) {
    reply(422, ['ok' => false, 'error' => 'invalid']);
}

// Simple rate limit per IP (kept in a small temp file)
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/ww_rl_' . hash('sha256', $ip);
$now  = time();
$hits = [];
if (is_file($file)) {
    $saved = json_decode((string) @file_get_contents($file), true);
    if (is_array($saved)) {
        $hits = array_values(array_filter($saved, function ($t) use ($now) { return is_int($t) && $t > $now - 3600; }));
    }
}
if (count($hits) >= MAX_REQUESTS_PER_HOUR) {
    reply(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

// Send the email
date_default_timezone_set('Asia/Karachi');
$subject = '=?UTF-8?B?' . base64_encode('New quote request: ' . $name) . '?=';
$body = "New cleaning quote request from the website\n\n"
      . "Name: $name\n"
      . "WhatsApp / phone: $phone\n"
      . "Solar capacity: " . ($capacity !== '' ? $capacity : '-') . "\n"
      . "Area in Karachi: $location\n\n"
      . 'Received: ' . date('d M Y, H:i') . " (Karachi time)\n";
$headers = "From: Wipe & Wash Website <" . FROM_EMAIL . ">\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

if (TO_EMAIL === 'CHANGE-ME@wipeandwash.com' || !@mail(TO_EMAIL, $subject, $body, $headers)) {
    reply(500, ['ok' => false, 'error' => 'mail']);
}
reply(200, ['ok' => true]);
