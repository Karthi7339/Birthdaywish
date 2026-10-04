Add-Type -AssemblyName System.Drawing

# 1. Photo 5: Mountain Heart Hands
$src5 = "C:\Users\sakth\.gemini\antigravity-ide\brain\c1c87bf0-b3e3-461b-8499-5891ad67401f\.user_uploaded\media_1791135645072.jpg"
$dest5 = "public\assets\photos\photo5.jpg"
Copy-Item -Path $src5 -Destination $dest5 -Force
Write-Host "Copied photo5.jpg"

# 2. Photo 6: Two friends in van
$src6 = "C:\Users\sakth\.gemini\antigravity-ide\brain\c1c87bf0-b3e3-461b-8499-5891ad67401f\.user_uploaded\media_1791135865707.jpg"
$dest6 = "public\assets\photos\photo6.jpg"
Copy-Item -Path $src6 -Destination $dest6 -Force
Write-Host "Copied photo6.jpg"

# 3. Photo 7: Group photo rotated horizontally
$src7 = "C:\Users\sakth\.gemini\antigravity-ide\brain\c1c87bf0-b3e3-461b-8499-5891ad67401f\.user_uploaded\media_1791136029341.jpg"
$dest7 = "public\assets\photos\photo7.jpg"

$img = [System.Drawing.Image]::FromFile($src7)
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$img.Save($dest7, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Saved horizontal photo7.jpg"
