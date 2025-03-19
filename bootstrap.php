<?php

use Dotenv\Exception\ExceptionInterface;

require __DIR__ . '/vendor/autoload.php';

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dotenv->required('MAILER_DSN')->notEmpty();
}
catch (ExceptionInterface $e) {
    http_response_code(500);
    echo "Missing environment variables; double-check installation instructions";
    exit;
}
