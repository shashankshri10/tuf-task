# Project: Codegram

## Prerequisites

Before proceeding with the installation, ensure you have Docker and Nginx installed on your system.

### Docker Installation

1. Install Docker on your system by following the official Docker documentation: [Get Docker](https://docs.docker.com/get-docker/).

### Nginx Installation

1. Install Nginx on your system using the following command:

   ```
   sudo apt install nginx
   ```

## Installation Instructions

1. Navigate to the root directory of the project.

2. Run the following command to build and start the project:

   ```
   sudo docker-compose up --build
   ```

   To run the process in the background, use:

   ```
   sudo docker-compose up --build -d
   ```

3. Edit the Nginx configuration file:

   ```
   sudo vi /etc/nginx/sites-available/codegram
   ```

4. Add the following configuration to the file:

   ```
   server {
       listen 80;
       server_name <ip_address>; # Your domain or server IP

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. Create a symbolic link to enable the site:

   ```
   sudo ln -s /etc/nginx/sites-available/codegram /etc/nginx/sites-enabled
   ```

6. Check the Nginx configuration syntax:

   ```
   sudo nginx -t
   ```

7. Adjust the firewall rules for Nginx:

   ```
   sudo ufw allow 'Nginx Full'
   ```

8. Ensure UFW (Uncomplicated Firewall) is running:

   ```
   sudo ufw enable
   ```

9. Restart Nginx to apply the changes:

    ```
    sudo systemctl restart nginx
    ```

## Deployment

Your site is now deployed and accessible.