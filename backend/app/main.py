from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import notes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(notes.router)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}