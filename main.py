"""Entry point for the SN17 miner pod service (batch generation API, port 10006)."""

import uvicorn

from miner.service import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10006, log_level="info")
