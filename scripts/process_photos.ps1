Add-Type -AssemblyName System.Drawing

# 1. Copy Snapchat Bitmoji to memory3.jpg
$source1 = "C:\Users\sakth\.gemini\antigravity-ide\brain\c1c87bf0-b3e3-461b-8499-5891ad67401f\.user_uploaded\media_1791131688563.jpg"
$dest1 = "public\assets\photos\memory3.jpg"
Copy-Item -Path $source1 -Destination $dest1 -Force
Write-Host "Copied Snapchat photo to $dest1"

# 2. Rotate Temple Trip photo so it is horizontal (people standing upright)
$source2 = "C:\Users\sakth\.gemini\antigravity-ide\brain\c1c87bf0-b3e3-461b-8499-5891ad67401f\.user_uploaded\media_1791131732699.jpg"
$dest2 = "public\assets\photos\memory2.jpg"

$img = [System.Drawing.Image]::FromFile($source2)
Write-Host "Original image size: $($img.Width) x $($img.Height)"

# The heads are pointing towards the right side (+90 deg).
# Rotating 270 degrees clockwise (or 90 degrees counter-clockwise) makes heads point upward and makes image landscape!
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)

Write-Host "Rotated image size: $($img.Width) x $($img.Height)"
$img.Save($dest2, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()

Write-Host "Saved horizontal temple trip photo to $dest2"
