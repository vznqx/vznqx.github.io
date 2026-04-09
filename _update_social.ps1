$newBlock = "<h2>Follow VZNQX</h2>`r`n<a href=`"https://www.facebook.com/VZNQX`">VZNQX Facebook</a><br>`r`n<a href=`"https://x.com/vznqx`">VZNQX Twitter</a><br>`r`n<a href=`"https://www.youtube.com/@VZNQX`">VZNQX YouTube</a><br>`r`n<a href=`"https://medium.com/@vznqx`">VZNQX Medium</a><br>"

# Pattern for blog files: pipe separator format
$pipePattern = '<p>Follow us:</p>\r?\n<a href="https://www\.facebook\.com/VZNQX">Facebook</a> \|\r?\n<a href="https://x\.com/vznqx">Twitter</a> \|\r?\n<a href="https://www\.youtube\.com/@VZNQX">YouTube</a>'

# Pattern for older files: <br> format (no "VZNQX" prefix, no Medium)
$brPattern = '<h2>Follow (?:Us|VZNQX)</h2>\r?\n\r?\n<a href="https://www\.facebook\.com/VZNQX">Facebook</a><br>\r?\n<a href="https://x\.com/vznqx">Twitter</a><br>\r?\n<a href="https://www\.youtube\.com/@VZNQX">YouTube</a>'

# Pattern for crypto-exchange-security.html (no br, no h2)
$plainPattern = '<p>Follow us:</p>\r?\n<a href="https://www\.facebook\.com/VZNQX">Facebook</a>\r?\n<a href="https://x\.com/vznqx">Twitter</a>\r?\n<a href="https://www\.youtube\.com/@VZNQX">YouTube</a>'

$files = Get-ChildItem -Path . -Filter "*.html" -Recurse | Where-Object { $_.Name -notin @('ai-trading-systems.html','what-is-deep-liquidity.html','links.html') }

foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $orig = $c

    $c = [regex]::Replace($c, $pipePattern, $newBlock)
    $c = [regex]::Replace($c, $brPattern, $newBlock)
    $c = [regex]::Replace($c, $plainPattern, $newBlock)

    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($f.FullName, $c)
        Write-Host "Updated: $($f.Name)"
    } else {
        Write-Host "Skipped (no match): $($f.Name)"
    }
}
