from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConnectionFailure
from fastapi import HTTPException
from decouple import config

MONGO_URI = config("MONGO_URI", default="mongodb://localhost:27017")
DATABASE_NAME = config("DATABASE_NAME", default="notes_db")

client = AsyncIOMotorClient(MONGO_URI, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except ConnectionFailure:
    print("Server not available")

db = client[DATABASE_NAME]

async def get_database():
    return db