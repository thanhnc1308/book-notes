export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

Recall that Pods are running in an isolated, private network - so we need to proxy access to them so we can debug and interact with them. To do this, we'll use the kubectl proxy command to run a proxy in a second terminal window. Click on the command below to automatically open a new terminal and run the proxy:

kubectl proxy

Now again, we'll get the Pod name and query that pod directly through the proxy. To get the Pod name and store it in the POD_NAME environment variable:

export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

To see the output of our application, run a curl request.

curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/

The url is the route to the API of the Pod.

We can execute commands directly on the container once the Pod is up and running. For this, we use the exec command and use the name of the Pod as a parameter. Let’s list the environment variables:

kubectl exec $POD_NAME env

Again, worth mentioning that the name of the container itself can be omitted since we only have a single container in the Pod.

Next let’s start a bash session in the Pod’s container:

kubectl exec -ti $POD_NAME bash

We have now an open console on the container where we run our NodeJS application. The source code of the app is in the server.js file:

cat server.js

You can check that the application is up by running a curl command:

curl localhost:8080

Note: here we used localhost because we executed the command inside the NodeJS container

We have a Service called kubernetes that is created by default when minikube starts the cluster. To create a new service and expose it to external traffic we’ll use the expose command with NodePort as parameter (minikube does not support the LoadBalancer option yet).

kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

Let’s run again the get services command:

kubectl get services

We have now a running Service called kubernetes-bootcamp. Here we see that the Service received a unique cluster-IP, an internal port and an external-IP (the IP of the Node).

To find out what port was opened externally (by the NodePort option) we’ll run the describe service command:

kubectl describe services/kubernetes-bootcamp

Create an environment variable called NODE_PORT that has the value of the Node port assigned:

export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
echo NODE_PORT=$NODE_PORT

Now we can test that the app is exposed outside of the cluster using curl, the IP of the Node and the externally exposed port:

curl $(minikube ip):$NODE_PORT

And we get a response from the server. The Service is exposed.



#Setup

apt-get -y update && apt-get -y install docker.io

sudo apt-get update
sudo apt-get install -y apt-transport-https
sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add 

#### Add repository

sudo cat <<EOF  > /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF

sudo vim /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main

__esc shift z z to save and exit__

#### 
sudo apt-get update  -y
sudo apt-get install -y kubelet kubeadm kubectl

sudo apt-get update -y 
sudo apt-get upgrade -y
sudo apt-get -y install -y vim curl wget 
sudo apt-get -y install byobu

Master

sudo cat << EOF > sudo /etc/network/interfaces
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto ens4
iface ens4 inet static
address 10.0.6.27
netmask 255.255.255.0
gateway 10.0.6.1 
dns-nameservers 127.0.0.53
EOF


sudo cat << EOF > sudo /etc/hosts
127.0.0.1       localhost k8s-master
10.0.6.27       k8s-master
10.0.6.28       k8s-node1
10.0.6.29       k8s-node2
EOF

sudo echo k8s-master > sudo /etc/hostname

### Nodes
sudo cat << EOF > sudo /etc/network/interfaces
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto ens4
iface ens4 inet static
address 172.16.0.4
netmask 255.255.255.0
gateway 172.16.0.1
dns-nameservers 127.0.0.53
EOF

### 2

sudo cat << EOF > sudo /etc/hosts
127.0.0.1       localhost k8s-master
172.16.0.4      k8s-master
10.0.6.29       k8s-node1
10.0.6.30       k8s-node2
EOF

sudo cat << EOF > sudo /etc/hosts
127.0.0.1       localhost k8s-node1
10.0.6.27       k8s-master
10.0.6.28       k8s-node1
10.0.6.29       k8s-node2
EOF

### 3
sudo echo k8s-node2 > sudo /etc/hostname

ens160
IP: 10.0.6.28
Netmask: 255.255.255.0
Gateway: 10.0.6.1 

IP: 10.0.6.29
Netmask: 255.255.255.0
Gateway: 10.0.6.1 

ip route: he default router IP address.
ip r | grep default: gateway
route -n
Type "ifconfig" at the terminal prompt, then press the "Enter" key. The IP address is labeled as "inet addr." The subnet is labeled as "Mask."

Type "netstat -r" at the command prompt, then press the "Enter" key to view the gateway address.

#### Set up cluster
sudo kubeadm init --apiserver-advertise-address 10.0.6.27 --pod-network-cidr=10.244.0.0/16


sudo nano /etc/fstab



To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.0.6.27:6443 --token sq8ezx.4w50lt5btim26bj0 \
    --discovery-token-ca-cert-hash sha256:d02b6a806453edd4cad1da66f461aaeab9c1eb31b73bedce0d9324c7e51e9a53 


sudo kubeadm join 10.0.6.27:6443 --token us3tog.orxds0vafb0n0mii     --discovery-token-ca-cert-hash sha256:d02b6a806453edd4cad1da66f461aaeab9c1eb31b73bedce0d9324c7e51e9a53 

public cái port của pod vừa tạo ra ngoài.

kubectl port-forward client 80:80

kubectl create -f authent-pod.yaml
kubectl create -f authent-pod2.yaml
kubectl get pods 

kubectl apply -f authent-pod.yaml       #save changes
kubectl get pod -l app=authent-api           #check if label is right

kubectl create -f authent-service.yaml
kubectl get svc

kubectl describe pod <pod-id>  
kubectl logs -f <pod-id>
You can use the -f flag:

-f, --follow=false: Specify if the logs should be streamed.

kubectl delete pod authent-pod1



Create or modify /etc/docker/daemon.json on the client machine

{ "insecure-registries":["10.0.6.27:50000"] }

Restart docker daemon

sudo /etc/init.d/docker restart

service docker restart

##1

/etc/default/docker
DOCKER_OPTS="--insecure-registry gitlab.mycompany.com:4567"

##2

sudo systemctl edit docker
add below lines
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// --insecure-registry registry:5000

sudo systemctl daemon-reload
systemctl restart docker
systemctl status docker

#3
Try adding --insecure-registry option to daemon in /etc/systemd/system/docker.service.d/docker.conf file.
Then sudo systemctl daemon-reload
And sudo service docker restart

    service docker restart
