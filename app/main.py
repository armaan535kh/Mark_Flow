from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
from pathlib import Path
from app.pdf_parser import extract_text_from_pdf

app = FastAPI()



UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]


@app.get("/")
def home():
    return {
        "message": "Welcome to MarkFlow"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a PDF or DOCX file."
        )

    file_path = UPLOAD_DIR / file.filename

    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    text = extract_text_from_pdf(file_path)
    print(text)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "File uploaded successfully",
        "text": text
    }