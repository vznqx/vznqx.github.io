Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $path = $_.FullName
    $c = [System.IO.File]::ReadAllText($path)
    $new = [regex]::Replace($c, 'https://x\.com/vznqx(?!_)', 'https://x.com/vznqx_')
    if ($new -ne $c) {
        [System.IO.File]::WriteAllText($path, $new)
        Write-Host "Updated: $($_.Name)"
    }
}
