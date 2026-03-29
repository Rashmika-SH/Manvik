import re

def fix():
    with open('index.html', 'r', encoding='utf-8') as f:
        c = f.read()
        
    c = re.sub(r'<span class="why-icon">.*?</span>\s*<h4>Global Reach</h4>', 
               '<span class="why-icon">🌍</span>\n        <h4>Global Reach</h4>', 
               c, flags=re.DOTALL)
               
    c = re.sub(r'<span>.*?</span>\s*<h4>Available Worldwide</h4>', 
               '<span>🌍</span>\n        <h4>Available Worldwide</h4>', 
               c, flags=re.DOTALL)
               
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(c)

if __name__ == '__main__':
    fix()
    print("Fixed globe icons!")
