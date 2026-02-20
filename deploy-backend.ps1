# Backend Deploy Script
# This script helps deploy your backend to Render

Write-Host "`n🚀 BLOCKCHAIN BACKEND DEPLOY`n" -ForegroundColor Green

# Check if Railway CLI is installed
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue

if ($railwayInstalled) {
    Write-Host "✅ Railway CLI found! Deploying..." -ForegroundColor Green
    Set-Location backend
    railway login
    railway init
    railway up
    Write-Host "`n✅ Backend deployed! Check Railway dashboard for URL`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Railway CLI not found. Opening Render dashboard...`n" -ForegroundColor Yellow
    
    Write-Host "📋 Quick Steps:" -ForegroundColor Cyan
    Write-Host "  1. Sign in with GitHub" -ForegroundColor White
    Write-Host "  2. Connect repo: 'Blockchain-System-'" -ForegroundColor White
    Write-Host "  3. Settings:" -ForegroundColor White
    Write-Host "     - Name: chainsys-backend" -ForegroundColor Gray
    Write-Host "     - Root Directory: backend" -ForegroundColor Gray
    Write-Host "     - Environment: Docker (auto-detect)" -ForegroundColor Gray
    Write-Host "  4. Click 'Create Web Service'" -ForegroundColor White
    Write-Host "  5. Wait 5-10 minutes for build" -ForegroundColor White
    Write-Host "  6. Copy the URL (example: https://chainsys-backend-xxx.onrender.com)`n" -ForegroundColor White
    
    Write-Host "🌐 Opening Render dashboard..." -ForegroundColor Green
    Start-Process "https://dashboard.render.com/select-repo?type=web"
    
    Write-Host "`n💡 TIP: Install Railway CLI for one-command deploy:" -ForegroundColor Yellow
    Write-Host "   npm install -g railway`n" -ForegroundColor Gray
}
