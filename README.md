# dataset-watchdog
Yaojie Liu

## Intro
This is a tutorial of dataset management. If you want to release a research dataset that requires access control, this may be useful to you.

## Prerequisites
I use the following tools to set up this dataset management system:

    1. Gmail Account
    2. Google Form
    3. Google Spreadsheet
    4. python
  
## Step 1: Set access to files on server
Before we move to any management side, make sure your dataset on the server is password protected by htaccess authentication.

     1. mkdir /path/to/your/dataset/folder
     2. upload your data /path/to/your/dataset/folder
     3. It's always a good idea to provide md5checksum to all your files
     4. chmod 644 /path/to/your/dataset/folder #this makes sure your dataset can only been read by others.
     5. cd /path/to/your/dataset/folder && chmod 644 ./*
     6. copy .htacess and .htpassword to /path/to/your/dataset/folder
 
