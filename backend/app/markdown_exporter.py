def save_markdown_file(markdown_text, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(markdown_text)