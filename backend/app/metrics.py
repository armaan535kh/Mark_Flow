def calculate_metrics(original_text, markdown_text):

    original_characters = len(original_text)
    markdown_characters = len(markdown_text)
    reduction = original_characters - markdown_characters
    reduction_percentage = (
    (reduction / original_characters) * 100 
    if original_characters > 0
    else 0)

    return {
        "original_characters": original_characters,
        "markdown_characters": markdown_characters,
        "reduction": reduction,
        "reduction_percentage": reduction_percentage
    }