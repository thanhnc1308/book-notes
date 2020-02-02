scp -r  opensource@52.230.4.199:/home/opensource/k8s-smejava/ /home/misa/TFS/docs/

scp -r /home/misa/TFS/docs/k8s-smejava/ opensource@52.230.4.199:/home/opensource/

scp -r /home/misa/TFS/docs/smejava/ administrator@10.0.6.27:/opt/projects/

rsync -ru /home/misa/TFS/docs/smejava/kubernetes administrator@10.0.6.27:/opt/projects/smejava/

rsync -vhz /home/misa/TFS/docs/smejava/kubernetes administrator@10.0.6.27:/opt/projects/smejava/

for (i = 1; i < 10; i++) {db.CABAReceiptPayment.insert({"CompanyID":i})}

 db.paymentreceipt.find({keycompany:"1company0"}).sort({modifiedDate:1}).limit(100).skip(0).explain("executionStats")

### import data mongo
FILES="/root/event_files/*"
for f in $FILES
do
    mongoimport -d mydb -c events --type csv --file "$f" --headerline
done

####
Use this one liner to bulk import all the csv files inside a given directory into the mydatabase db in Mongo.

for i in *.csv; do mongoimport -d mydatabase -c ${i%.*} --type csv --file $i --headerline ; done
####

use reportdb3;
set sql_safe_updates=0;
CREATE TABLE reportc2 LIKE generalledger;
INSERT  report9 SELECT * FROM  generalledger;

UPDATE report9 set `RefID`= concat('hoang8',refid),  `CompanyCode`='MSC00002';


INSERT  report_final SELECT * FROM  report4;
INSERT  report_final SELECT * FROM  report5;
INSERT  report_final SELECT * FROM  report6;
INSERT  report_final SELECT * FROM  report7;
INSERT  report_final SELECT * FROM  report8;
INSERT  report_final SELECT * FROM  report9;
INSERT  report_final SELECT * FROM  report3;

INSERT  reportc2  SELECT * FROM  report_final;

##
mongoimport -c analyst -d usersight --type csv --columnsHaveTypes --headerline "_id.string(),Dimension.string(),Media.string(),Sentiment.string(),Popularity.string(),Date.date(2006-01-02T15:04:05.000Z\),Keywords.string()" --file test.csv

- mongoimport -c analyst -d usersight --columnsHaveTypes --type csv --headerline --file test.csv

Either make sure the first line of your data.csv file has field names of the data to be parsed and then execute:

mongoimport --db users --collection contacts --type csv --headerline --file data.csv
Or

Define the list of field names that the values of csv would be parsed in using --fields

mongoimport --db users --collection contacts --type csv --file data.csv --fields["name","surname","etc"]

* * * * * sh /etc/scale.sh >/dev/null 2>&1 > /home/misa/cronlogs/scale.log       

    docker events --filter 'container=smejava_payment-api_1' --filter 'container=smejava_payment-api_2'  --format '{{json .}}'
docker events --format '{{json .}}'

insert into `new_schema`.PaymentReceiptCommand
select * from `d7a21365-4930-11e9-9c05-0242c0a81002`.PaymentReceiptCommand;


- check if it is running
- exec container. test what can be used to connect (connect manually)
mysql -h $(docker-machine ip) -P 32768 -u root -p


k get hpa --namespace smejava
k describe hpa --namespace smejava
kubectl apply -f deploy/1.8+/

Change the metrics-server-deployment.yaml file and add:

        command:
        - /metrics-server
        - --kubelet-preferred-address-types=InternalIP

The metrics-server is now able to talk to the node (It was failing before because it could not resolve the hostname of the node).


 command:
        - /metrics-server
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP

args:
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP
If you're going to use InternalIP, you should probably set up your node's serving certs to list the IP as an alternative name. You generally don't want to pass kubelet-insecure-tls except in testing setups.

###
edit metric-service deployemnt add this cofnig unser Deployemnt.spec.template.spec

      hostAliases:
      - hostnames:
        - k8s-master1
        ip: xxxxx
      - hostnames:
        - k8s-node1
        ip: yyyyy
      - hostnames:
        - k8s-node2
        ip: zzzzz

any process that serves TLS (HTTPS) needs certificates to use to encrypt communications and verify identity as part of the TLS process. We call these certificates "serving certificates", because they're used to "serve" HTTPS. Since the node is serving HTTPS, it has serving certificates for this purpose. Certificates can have "names" embedded that help define the identity of the process serving the content. In the case of HTTP, these names (common name and alternative name) define what IP addresses, host names, etc the certificate is valid for.

### change metrics-service deploy
kubectl edit deployment metrics-server -nkube-system
change spec.template.spec.containers.command to

command:
- /metrics-server
- --source=kubernetes.summary_api:''

 command:
        - /metrics-server
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP
add hostAlias under sepc.template.spec.containers

      hostAliases:
      - hostnames:
        - k8s-master1
        ip: xxxx
      - hostnames:
        - k8s-node1
        ip: xxx
      - hostnames:
        - k8s-node2
        ip: xxx
the name and ip should be your k8s cluster node hostname and ip

kubectl top pods --all-namespaces

###
I was able to resolve the certificate issue without disabling TLS. With k8s version 1.13.1, I was able to generate new certs using https://kubernetes.io/docs/tasks/tls/managing-tls-in-a-cluster/ and openssl.

I generated the CSR and private key with openssl and passed that to the certificates API in K8S to approve and sign it. Then I downloaded the signed cert and put it in /var/lib/kublet/pki/ and added the kublet tls cert and key params to /etc/sysconfig/kubelet. And then obviously I had to restart the kubelet service. Now, port 10250 on each node has a K8S CA signed cert installed.

However, I did notice some deprecation warnings regarding using those params in the KUBELET_EXTRA_ARGS

