def clean_text(text):

    lines = text.split("\n")

    cleaned_lines = []
    for line in lines:
        clean_line = " ".join(line.split())
        if cleaned_lines and clean_line == "" and cleaned_lines[-1] == "":
            continue
        
        cleaned_lines.append(clean_line)
        

    
    return "\n".join(cleaned_lines).strip() 