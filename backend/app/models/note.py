from pydantic import BaseModel
from typing import Optional

class Note(BaseModel):
    title: str
    content: str
    id: Optional[str] = None