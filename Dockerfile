# Use the official MySQL 8.0 image
FROM mysql:8.0

# Copy the SQL file to the container
COPY tuf_db_dump_file.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
