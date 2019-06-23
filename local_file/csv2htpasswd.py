import os
import csv

try:
    os.remove(".htpasswd")
except:
    print('Nothing to delete.')

with open('./htpasswd.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            line_count += 1
        print(row["Status"]+' '+row["Username"]+':'+row["Password"])
        status = row["Status"]
        if status == 'Approved':
            bashCommand = 'printf "' + row["Username"] + ':$(openssl passwd -crypt ' + row["Password"] + ')\\n" >> .htpasswd'
            os.system(bashCommand)
        line_count += 1
    print('Processed '+str(line_count-1)+' records!')