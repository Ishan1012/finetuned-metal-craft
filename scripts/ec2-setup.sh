#!/usr/bin/env bash
# =========================================================================
# AWS EC2 t3.micro One-Click Setup Script for ASDE Laser Cutting
# Run this once on your newly launched Ubuntu EC2 instance:
#   bash ec2-setup.sh
# =========================================================================

set -e

echo "============================================="
echo "  [1/5] Updating Packages & Installing Essentials"
echo "============================================="
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release ufw

echo "============================================="
echo "  [2/5] Configuring 2GB Swap Memory for t3.micro"
echo "  (Prevents Out-Of-Memory / OOM on 1GB RAM)"
echo "============================================="
if ! grep -q '/swapfile' /etc/fstab; then
    sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    # Optimize swappiness for t3.micro
    sudo sysctl vm.swappiness=10
    echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
    echo "Swap configured successfully:"
    free -h
else
    echo "Swap file already exists. Skipping."
fi

echo "============================================="
echo "  [3/5] Installing Docker & Docker Compose"
echo "============================================="
if ! command -v docker &> /dev/null; then
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Enable and start Docker service
    sudo systemctl enable docker
    sudo systemctl start docker

    # Add current user to docker group
    sudo usermod -aG docker "$USER"
    echo "Docker installed successfully! Version:"
    docker --version
else
    echo "Docker already installed."
fi

echo "============================================="
echo "  [4/5] Preparing Application Directory"
echo "============================================="
mkdir -p ~/app
cd ~/app

if [ ! -f .env ]; then
    echo "Creating template ~/app/.env file..."
    cat << 'EOF' > .env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://asdeadmin:sK0YTyEJx5FN6wuG@cluster0.zr2ad4r.mongodb.net/?appName=Cluster0
JWT_SECRET=ca8004f357d27b9bb641db2e9844c68e3e69afcb8f3ef28d49c44985174f938a
RAZORPAY_KEY_ID=rzp_test_T0ZhE3atwRtK8R
RAZORPAY_KEY_SECRET=pbloFdd0aqVCp07W2Ar8GkkH
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=memomate702@gmail.com
SMTP_PASS=flrnplfiyscovecf
ADMIN_EMAIL=memomate702@gmail.com
ENCRYPTION_KEY=c90xY4f357d27b9bb641db2e9674c68e3e69afcb8f3ef67d49c44985174f938a
EOF
    chmod 600 .env
    echo "Created ~/app/.env with credentials. Review with: nano ~/app/.env"
fi

echo "============================================="
echo "  [5/5] Setup Complete!"
echo "============================================="
echo "IMPORTANT: Log out and log back in (or run 'newgrp docker') for docker group permissions to take effect."
echo "Your EC2 instance is now ready for automated GitHub Actions CI/CD deployment!"
