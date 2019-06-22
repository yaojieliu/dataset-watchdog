# dataset-watchdog
Contact: [Yaojie Liu](yjliu0414@gmail.com)

## Intro
This is a tutorial of dataset management. If you want to release a research dataset that requires access control, this may be useful to you.

In my case, I create this management system for our face anti-spoofing databases ([SiW](http://cvlab.cse.msu.edu/spoof-in-the-wild-siw-face-anti-spoofing-database.html) and SiW-M+).

## Prerequisites
I use the following tools to set up this dataset management system:

    1. Gmail Account
    2. Google Form
    3. Google Spreadsheet
    4. python
  
## Step 1: Set access to files on server
Before we move to any management side, make sure your dataset on the server is password protected by htaccess authentication.

     1. > 'mkdir /path/to/your/dataset/folder'
     2. upload your data /path/to/your/dataset/folder
     3. It's always a good idea to provide md5checksum to all your files
     4. > 'chmod 644 /path/to/your/dataset/folder' #read-only for others
     5. > 'cd /path/to/your/dataset/folder && chmod 644 ./*'
     6. copy .htacess and .htpassword to /path/to/your/dataset/folder
     
## Step 2: Set up Google Forms to collect applications
Now let's create a Google Forms for online application.

     1. Create a Gmail account for managing dataset
     2. Use your account to create a Google Forms (Drive --> New --> More --> Google Forms)
     3. Design your own online application form. For me, the Google Form would collect email, name, academic/industrial, advisor information, and upload the agreement form. You can check my form [here] (https://docs.google.com/forms/d/e/1FAIpQLScYtuCOp5G3-Pu2Jrtu_ZGd8-WQ0sMsX0l-DsQ-Jy_prVAjDg/viewform);
 
