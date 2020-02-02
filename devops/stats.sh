# https://stackoverflow.com/questions/41668621/how-to-configure-autoscaling-on-docker-swarm
services=$(docker ps --format '{{.ID}}')
a=$((17+23))
echo "a = $a"      # Prints a = 40
if [ "$a" -gt 5 ]; then echo "a is more than 5"; fi
for service in $services; do
    echo $service
    cpu=$(docker stats --no-stream --format '{{.CPUPerc}}' $service) #| grep 'insufficient resources' 1>/dev/null
    if [ "$cpu" -gt 7 ];
    then echo "true"
    else echo "false"
    fi
#   tasks=$(docker service ps $service --format '{{.ID}}')
#   for task in $tasks; do
#     if docker inspect $task --format '{{.Status}}' | grep 'insufficient resources' 1>/dev/null; then
#       scale-up-cmd
#     fi
#   done
done