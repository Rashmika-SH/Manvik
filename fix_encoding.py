import os
import glob
import sys

def fix_mojibake(filepath):
    # Read the file as raw UTF-8 as it is right now
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We only want to attempt fixing if we see typical mojibake patterns
    if 'â' not in content and 'ð' not in content:
        return

    try:
        # The characters are currently UTF-8 characters that represent what happens
        # when a UTF-8 byte stream is mistakenly decoded as Windows-1252/Latin-1.
        # We encode back to the raw bytes using windows-1252, then decode properly as utf-8.
        raw_bytes = content.encode('windows-1252')
        fixed_content = raw_bytes.decode('utf-8')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        print(f"Fixed encoding in: {filepath}")
    except Exception as e:
        print(f"Skipping {filepath} or could not fully decode: {e}")

if __name__ == '__main__':
    html_files = glob.glob('*.html')
    for file in html_files:
        fix_mojibake(file)
