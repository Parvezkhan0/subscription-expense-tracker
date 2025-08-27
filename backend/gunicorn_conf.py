# gunicorn_conf.py

import multiprocessing

# Bind to all IPs on port 8000
bind = "0.0.0.0:8000"

# Number of worker processes (adjust based on your CPU cores)
workers = 2

# Use uvicorn worker class for FastAPI
worker_class = "uvicorn.workers.UvicornWorker"

reload = True