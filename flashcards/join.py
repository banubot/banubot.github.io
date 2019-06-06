'''
Hannah Parraga
Make json from all flashcard files in directory 
where russian words are one per line and english words
are in key files named filename + "k" 
json created in format 
[
    {
        "rus": "example",
        "eng": "example"
    },
    {
        ....
    },
]
just deleted single trailing comma by hand
'''

import os

out = open("out.json", "w")
for filename in os.listdir():
    if not ("k" in filename or ".json" in filename or ".py" in filename):
        out.write("[\n")
        file = open(filename, "r")
        key = open(filename + "k", "r")
        lines = file.readlines()
        keylines = key.readlines()
        for i in range(len(lines)):
            print(str(i) + " " + filename)
            out.write("\t{\n\t\t\"rus\": \"" 
                      + lines[i].strip() 
                      + "\",\n\t\t\"eng\": \"" 
                      + keylines[i].strip() + "\"\n\t},\n")
        file.close()
        key.close()
out.write("]")
out.close()
