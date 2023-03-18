<?php
$wave_data = file_get_contents('php://input');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="wave_data.txt"');
echo implode("\n", unpack('s*', $wave_data));