from fastapi import APIRouter, HTTPException, Depends
from app.models.note import Note
from app.schemas.note_schema import NoteCreate, NoteUpdate
from app.database.mongo import get_database, db
from typing import List
from bson import ObjectId

router = APIRouter(prefix="/notes", tags=["notes"])

@router.post("/", response_model=Note)
async def create_note(note: NoteCreate, database = Depends(get_database)):
    note_dict = note.dict()
    result = await database.notes.insert_one(note_dict)
    created_note = await database.notes.find_one({"_id": result.inserted_id})
    created_note["id"] = str(created_note["_id"])
    del created_note["_id"]
    return Note(**created_note)

@router.get("/", response_model=List[Note])
async def read_notes(database = Depends(get_database)):
    notes = []
    async for note in database.notes.find():
        note["id"] = str(note["_id"])
        del note["_id"]
        notes.append(Note(**note))
    return notes

@router.get("/{note_id}", response_model=Note)
async def read_note(note_id: str, database = Depends(get_database)):
    note = await database.notes.find_one({"_id": ObjectId(note_id)})
    if note:
        note["id"] = str(note["_id"])
        del note["_id"]
        return Note(**note)
    else:
        raise HTTPException(status_code=404, detail="Note not found")

@router.put("/{note_id}", response_model=Note)
async def update_note(note_id: str, note_update: NoteUpdate, database = Depends(get_database)):
    update_data = {k: v for k, v in note_update.dict().items() if v is not None}
    result = await database.notes.update_one({"_id": ObjectId(note_id)}, {"$set": update_data})
    if result.modified_count == 1:
        updated_note = await database.notes.find_one({"_id": ObjectId(note_id)})
        updated_note["id"] = str(updated_note["_id"])
        del updated_note["_id"]
        return Note(**updated_note)
    else:
        raise HTTPException(status_code=404, detail="Note not found")

@router.delete("/{note_id}", response_model=dict)
async def delete_note(note_id: str, database = Depends(get_database)):
    result = await database.notes.delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 1:
        return {"message": "Note deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Note not found")