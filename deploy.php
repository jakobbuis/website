<?php

namespace Deployer;

require 'recipe/composer.php';

set('application', 'personal-website');
set('repository', 'git@github.com:jakobbuis/website.git');
set('default_stage', 'production');
set('keep_releases', 3);

set('shared_files', ['.env']);

host('jakobbuis.nl')
    ->set('hostname', 'jakobbuis.nl')
    ->set('remote_user', 'jakob')
    ->set('branch', 'main')
    ->set('deploy_path', '/srv/personal-website');
