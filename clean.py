from random import seed, shuffle
import re
import os
from shutil import rmtree
import unicodedata

seed("lol")


def strip_accents(s):
    return "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )


words = []
with open("./zone.txt") as f:
    for word in f.readlines():
        word = word.strip()

        if len(word) > 9 or len(word) < 6:
            continue
        if " " in word:
            continue

        word = strip_accents(word)
        word = word.replace("-", "")
        word = word.replace("'", "")
        word = word.replace("(", "")
        word = word.replace(")", "")

        if not re.match(r"^[a-zA-Z]+$", word):
            print(word)
            continue
        words.append(word)

shuffle(words)

rmtree("./mots", ignore_errors=True)
os.makedirs("./mots", exist_ok=True)
for i, word in enumerate(words):
    with open(f"./mots/{i+1}.txt", "w") as f:
        f.write(word.upper())
