<?php

use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

require_once __DIR__ . '/../bootstrap.php';

/*
 * Parse the form input
 */
$form = $_POST['form'] ?? null;
$email = $_POST['email'] ?? 'niet ingevuld';
$feedback = $_POST['feedback'] ?? 'niet ingevuld';

if (!$form) {
    http_response_code(400);
    echo "Missing form type";
    exit;
}

/*
 * Construct the email
 */
$text =<<<EOD
Website form

Formulier: $form
Email: $email
Feedback: $feedback
EOD;

/*
 * Send the email
 */
$transport = Transport::fromDsn($_ENV['MAILER_DSN']);
$mailer = new Mailer($transport);
$receipients = [
    new Address('jakob@jakobbuis.nl', 'Jakob Buis'),
];

try {
    $mailer->send(
        (new Email())
            ->from(new Address('no-reply@jakobbuis.nl'))
            ->to(...$receipients)
            ->subject('Formulier website')
            ->text($text)
    );
} catch (TransportException) {
    http_response_code(500);
    echo "Failed to send email: please try again later";
    exit;
}

/*
 * Confirmation response
 */
echo 'Bedankt voor het invullen van dit formulier.';
