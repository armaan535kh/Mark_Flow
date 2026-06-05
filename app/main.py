from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
from pathlib import Path

from app.markdown_exporter import save_markdown_file
from app.pdf_parser import extract_text_from_pdf
from app.markdown_cleaner import clean_text
from app.markdown_convertor import convert_to_markdown
from app.metrics import calculate_metrics
from app.token_metrics import calculate_token_metrics

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

ALLOWED_TYPES = [
    "application/pdf"
]


@app.get("/")
def home():
    return {
        "message": "Welcome to MarkFlow"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a PDF file."
        )

    # Save uploaded PDF
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1: Extract text
    text = extract_text_from_pdf(file_path)

    # Step 2: Clean text
    cleaned_text = clean_text(text)

    # Step 3: Convert to Markdown
    markdown_text = convert_to_markdown(cleaned_text)

    # Step 4: Character metrics
    metrics = calculate_metrics(text, markdown_text)

    # Step 5: Token metrics
    token_metrics = calculate_token_metrics(text, markdown_text)

    # Step 6: Save markdown file
    output_path = OUTPUT_DIR / f"{Path(file.filename).stem}.md"

    save_markdown_file(
        markdown_text,
        output_path
    )

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "File uploaded successfully",
        "markdown_file": str(output_path),
        "markdown": markdown_text,
        "metrics": metrics,
        "token_metrics": token_metrics
    }