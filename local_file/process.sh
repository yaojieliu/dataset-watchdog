mv *.csv htpasswd.csv
python csv2htpasswd.py
scp .htpasswd yjliu0414@server.name:/path/to/your/dataset/folder
rm .htpasswd
rm *.csv