https://stackoverflow.com/questions/44477049/docker-scaling-containers-on-a-single-host
ensure that the service we want to scale does not specify the external/host port. If we specify that port, the service cannot be scaled since all the instances would try to use the same host port.

Even on a single physical host, that would allow to better allocate and divide the resources of the physical machine between the different container. If one of those containers fails, the other can still provide the expected service.

are there any benefits from scaling a service in mulitple containers on a single host?

Well, yes, because you can still load balance the traffic to your application and achieve a basic level of container resilience.
