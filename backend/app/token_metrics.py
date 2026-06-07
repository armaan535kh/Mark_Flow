def calculate_token_metrics(original_text, markdown_text):

    original_tokens = original_text.split()
    markdown_tokens = markdown_text.split()

    original_token_count = len(original_tokens)
    markdown_token_count = len(markdown_tokens)

    token_reduction = (
        original_token_count - markdown_token_count
    )

    token_reduction_percentage = (
        (token_reduction / original_token_count) * 100
        if original_token_count > 0
        else 0
    )

    return {
        "original_token_count": original_token_count,
        "markdown_token_count": markdown_token_count,
        "token_reduction": token_reduction,
        "token_reduction_percentage": token_reduction_percentage
    }