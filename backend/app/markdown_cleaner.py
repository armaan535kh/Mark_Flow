def is_noise(line):
    return line.strip() in {
        "●",
        "↓",
        "→",
        "■",
        "□",
        "▪",
        "◦"
    }


def clean_text(text):

    lines = text.split("\n")

    cleaned_lines = []

    for line in lines:

        # Remove decorative symbols
        if is_noise(line):
            continue

        # Remove extra spaces
        clean_line = " ".join(line.split())

        # Prevent multiple blank lines
        if (
            cleaned_lines
            and clean_line == ""
            and cleaned_lines[-1] == ""
        ):
            continue

        cleaned_lines.append(clean_line)

    return "\n".join(cleaned_lines)