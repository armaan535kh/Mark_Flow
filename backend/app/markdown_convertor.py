def is_heading(line):
    line = line.strip()

    return (
        line != ""
        and any(char.isalpha() for char in line)
        and line == line.upper()
        and len(line) < 50
    )

def is_bullet(line):
    line = line.strip()

    return (
        line.startswith("- ")
        or line.startswith("* ")
        or line.startswith("+ ")
        or line.startswith("• ")
    )

def convert_to_markdown(text):
    lines = text.split("\n") 
    converted_lines = []

    for line in lines:
        if is_heading(line):
            converted_lines.append(f"# {line.strip()}")
        elif is_bullet(line):
            converted_lines.append(f"- {line.strip()[2:]}")
        else:
            converted_lines.append(line)
    return "\n".join(converted_lines)

