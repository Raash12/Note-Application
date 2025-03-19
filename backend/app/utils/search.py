def search_notes(notes, query):
    results = []
    for note in notes:
        if query.lower() in note.title.lower() or query.lower() in note.content.lower():
            results.append(note)
    return results