sudo cat << EOF > sudo /etc/hosts
127.0.0.1       localhost k8s-master
52.230.4.199       k8s-master
10.0.6.29       k8s-node1
10.0.6.30       k8s-node2
EOF

sudo cat <<EOF > sudo /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF

kubeadm init --apiserver-advertise-address 172.16.0.4 --pod-network-cidr=10.244.0.0/16


kubeadm join 172.16.0.4:6443 --token ut91ob.fdyb99tye8b5lxch \
    --discovery-token-ca-cert-hash sha256:8df3b1216413f9087c786afcf98a6c18962379f22142d0a06688da184862aad1 


kubeadm join 172.16.0.4:6443 --token kn1j20.kswjhy3s88vbatli     --discovery-token-ca-cert-hash sha256:8df3b1216413f9087c786afcf98a6c18962379f22142d0a06688da184862aad1 

kubectl get pod --all-namespaces -o wide


# Namespaces
- virtual cluster inside Kubenetes cluster
- multiple namespace in a single Kube cluster. all isolated 

kubectl create namespace test

test.yaml

kind: Namespace
apiVersion: v1
metadata:
    name: test
    labels:
        name: test

get namespace

k get pods  //run against current namespace. by default is default
k get pods --namespace=test

use kubens to change namespace
a service in a namespace can talk to services in another namespace although namespace is hidden from each other

- can create same name service in different namespace
### DNS address
<Service name>.<namespace name>.svc.cluster.local

database.test

5-10 services --> use 1 default

kubectl autoscale deployment authent-service --cpu-percent=50 --min=1 --max=10