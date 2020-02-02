- Kubernetes là một công cụ để điều phối container, và nó ẩn đi toàn bộ hạ tầng sử dụng phía dưới.
- cung cấp 1 bộ API đóng vai trò trung gian cho ta giao tiếp. Ví dụ, một API sẽ có thể gọi đến như kiểu "Kubernetes hãy tạo 4 container cho image X" chẳng hạn. Khi đó, kubernetes sẽ tìm tới các node bên dưới nó và tạo các container mới cho ta (mà ta cũng chả cần quan tâm mấy cái node hay container nó ở đâu)
Api server: là cách duy nhất để ta giao tiếp với Cluster. Đây cũng là chỗ để start hay stop các container (pod), kiểm tra trạng thái, check log ...
Kubelet: Monitor các container (pod) nằm trong 1 node, giao tiếp với master node.
Pod: Tạm thời thì cứ coi pod tương đương với container đi.

Client <----> API server <------> Kubernetes master <------> Nodes (a core OS including some pods)

Pod: một nhóm các container đã được schedule để tồn tại trên cùng một Node 
Kubelet
Kubelet có nhiệm vụ khởi động/duy trì Pod/Container thông qua việc đọc manifest file của Pod được viết bằng YAML
Label
Label là dạng key-value định nghĩa đơn giản nhiệm vụ của các Pod. Ví dụ: bằng việc thêm label như environment=dev, environment=production, tier=frontend hay tier=backend, ta có thể phân biệt Pod này là để develop hay production
 label cũng được sử dụng tại cơ chế scale, khi tạo mới Pod có gắn label nhất định sẽ tự động scale out, nếu xoá label sẽ tự động scale in.

Một Pod có thể chứa nhiều Label.
Master
Thứ quản lý những thứ khác của các loại Node chính là Master. Về cơ bản thì nó có nhiệm vụ nhận những điểm thay đổi về cài đặt rồi triển khai.

API Server
Đúng theo tên gọi, đây chính là server cung cấp Kubernetes API. Nó có nhiệm vụ đặt Pod vào Node, đồng bộ hoá thông tin của Pod bằng REST API tiếp nhận cài đặt của pod/service/replicationController.

etcd
Có thể liên kết cài đặt với từng node thông qua etcd.

K8s cluster bao gồm nhiều node, trên mỗi node sẽ cần chạy một "kubelet", đây là chương trình để chạy k8s. Cần một máy để làm "chủ" cluster, trên đó sẽ cài API server, scheduler ... Các máy còn lại sẽ chạy kubelet để sinh ra các container.

Controller Manager Service
Được hiểu giống như “kube-controller manager”, nó quản lý tất cả các bộ điều khiển xử lý các tác vụ thông thường trong cluster. Chúng bao gồm Node Controller, Replication Controller, Endpoints Controller, and Service Account and Token Controllers. Chi tiết của các hoạt động này được ghi vào etcd, nơi controller manager theo dõi sự thay đổi thông qua API Server.

Scheduler Service
Scheduler Service có trách nhiệm giám sát việc sử dụng tài nguyên trên mỗi máy chủ để đảm bảo rằng hệ thống không bị quá tải. Scheduler Service phải biết tổng số tài nguyên có sẵn trên mỗi máy chủ, cũng như các tài nguyên được phân bổ cho các khối lượng công việc hiện có được gán trên mỗi máy chủ.


