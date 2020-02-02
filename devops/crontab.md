crontab -l
no crontab for root
It displays this message because crontab -l list entries from user crontab and you edited just global crontab. If you want to edit users crontab just use this command:

crontab -e
To verify that your task has been executed just grep syslog:

grep CRON /var/log/syslog

https://askubuntu.com/questions/313033/how-can-i-see-stop-current-running-crontab-tasks

sudo crontab -u userName -l
