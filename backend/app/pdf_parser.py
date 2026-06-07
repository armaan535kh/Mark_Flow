import fitz



def extract_text_from_pdf(file_path):
    pdf_doc = fitz.open(file_path)
    all_text = ""

    for page in pdf_doc:
        text = page.get_text()
        all_text += text + "\n\n"

    pdf_doc.close()

    return all_text