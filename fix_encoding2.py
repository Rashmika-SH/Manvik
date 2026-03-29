import glob

def fix_mojibake(filepath):
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The issue: the original text was incorrectly encoded as windows-1252 
    # and then saved as utf-8. We recently injected a valid UTF-8 moon emoji 🌙
    # which breaks the global windows-1252 decode.
    # So we swap it out first.
    placeholder = "___MOON_PLACEHOLDER___"
    if '🌙' in content:
        content = content.replace('🌙', placeholder)

    try:
        # Convert corrupted characters back to raw bytes
        raw_bytes = content.encode('windows-1252')
        # Decode properly as UTF-8
        fixed_content = raw_bytes.decode('utf-8')
    except Exception as e:
        print(f"Skipping {filepath} or could not fully decode: {e}")
        return

    # Put the moon back!
    if placeholder in fixed_content:
        fixed_content = fixed_content.replace(placeholder, '🌙')

    # Save
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    print(f"Fixed encoding in {filepath}")

if __name__ == '__main__':
    for file in glob.glob('*.html'):
        fix_mojibake(file)
