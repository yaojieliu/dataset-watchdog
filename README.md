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
Now let's create a Google Forms for online application:

   1. Create a Gmail account for managing dataset
   2. Use your account to create a Google Forms (Drive --> New --> More --> Google Forms)
   3. Design your own online application form. For me, the Google Form would collect email, name, institute, advisor information, and upload the agreement form. You can check my form [here](https://docs.google.com/forms/d/e/1FAIpQLScYtuCOp5G3-Pu2Jrtu_ZGd8-WQ0sMsX0l-DsQ-Jy_prVAjDg/viewform)
   4. You may also want to use add-ons in the Google Form, such as Email Notification from Form/Form Notifications, to send the auto remainder to you and the requester, saying something like "Oh, we receive your request/we are on it."
   
## Step 3: Link Google Forms to a Google Spreadsheet
Now let's create a Google Forms for online application:

   1. In Google Forms, click Response, and click ![alt text](https://github.com/yaojieliu/dataset-watchdog/blob/master/icon.png) to link your form to a Google Spreadsheet
   2. In the linked spreadsheet, you will see all the items in your form. 
   3. To manage the applications, add several columns of **Username** (I use email as username), **Password** (I generate 6 random digits), **Status** (approved/pending/reject/extended/so on...), **Expire date** (set as 30 days after Send date), **Sent date** (the date I approve the application and sent requester the username/password), **Note** (reasons of Status, more for rejected/pending cases) and other things you may need
   
## Step 4: Write functions to generate username/password and send emails to pending applicants
Now let's write gs functions for online processing:
   1. Click Tools --> Script editor, use google_file/code.gs but change parts to fit your needs. Basically, this code would process pending requests, generate username/password and send email to them
   2. After modifying the code, run onOpen()
   3. Go back to the Spreadsheet, you will see the reply button appears

## Step 5: Test the system
Now everything should be all set now, but before put everything onlne, it's better to test with a couple of dummy applications:
   1. Fill three applicant
   2. After modifying the code, run onOpen()
   3. Go back to the Spreadsheet, you will see the reply button appears 

## Step 6: Test the system
Now everything should be all set now, but before put everything onlne, it's better to test with a couple of dummy applications:
   1. Fill three applicants on Google Forms via preview option
   2. When you receive the applications in the Google Spreadsheet, approve/reject/pending one applicant, and click Send emails to process them
   3. Check whether all emails are sent to the correct person with correct information  
   4. Download the spreadsheet as .csv file and use process.sh to update the .htpasswd on the server
   5. If step1-step4 run without error, now it's ready to release your dataset.
   
## Acknowledge
If you find this is useful, you can give this repo a star. 
If you have any questions or any suggestions to make this system more automatic, please pull a request.

Thanks
 
