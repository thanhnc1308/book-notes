# Transaction
- Distribution system: transaction qua nhiều services
- Consistent transaction: 
- Problems: đảm bảo toàn vẹn và nhất quán dữ liệu
### Solution
#### 2 phase commit
- Chỉ thực hiện phase commit khi phase chuẩn bị thực hiện nhất quán
- Có một transaction manager gửi event đến các thành phần liên quan đến nó. Có 2 kết quả trả về: nếu fail thì hủy transaction và rollback, nếu success thì chuyển qua phase commit. Phase commit gửi event và nhận status để rollback hoặc tiếp tục
- Việc rollback quá nhiều lần có thể ảnh hưởng performance
#### Event
- Mỗi event chỉ liên quan đến một service
##### Sync
##### Async
- Áp dụng cho mô hình thiết kế nhỏ và dễ triển khai

#### Event??
- Có bộ quản lí trung gian để biết event đến service
- Khi một request tạo ra thì gửi đồng thời đến các service
- Các service được gửi đồng thời --> giảm độ trễ
- Nếu kết quả trả về từ các service không nhất quán thì rollback
- Async
#### Saga
- Chuỗi giao dịch con trong đó mỗi yêu cầu được ghép nối với một hành động bù
##### Choreographed Saga
- Request gửi đồng thời đến các services. Mỗi services khi có lỗi xảy ra thì trả về trạng thái và thực hiện hành động bù (ko rollback lại ban đầu)
- __Ghi tạo mới mà bị lỗi khi bù là ghi lại trạng thái hay xóa?__
- Thực hiện hành động bù và ghi logs trạng thái xảy ra
- Config số lần bù nếu không thành công thì chặn request. có thể dùng circuit breaker
+ easy to deploy, loosely coupled
+ tăng độ trễ hệ thống, khó quản lí trạng thái
- Nếu giao dịch ban đầu fail thì vẫn trả về kết quả nhưng là kết quả ko mong muốn
##### Orchestrated saga
- Req được gửi đến các services tương ứng và có hoạt đọng bù. Có bộ quản lí tập trung. 
+ Bộ quản lí tập trung điều phối và yêu cầu bù tức thì --> giảm độ trễ --> áp dụng cho kiến trúc nhiều thành phần tham gia và kiến trúc phức tạp
+ Thay vì services phải nhận yêu cầu từ các service khác thì có một bộ quản lí điều phối nhận kết quả service trả về và gửi req đến các service tiếp theo 
+ Dễ quản lí theo dõi
- ???Có quá nhiều req thì cần quản lí bộ quản lí để đảm bảo performace
- Async --> dùng message queue
#### Event sourcing
- Có event xảy ra thì có một bản lưu trữ status từng service. Mỗi event luôn được kiểm tra và đảm bảo tính chính xác mỗi sự kiện
- Nếu có event lỗi thì thực hiện và trả về
- Lưu trong một db event store 
- Để kích hoạt sự kiện
- Lưu tất cả event --> nếu lỗi thì có thể chạy lại status và giá trị từng request từ đầu đến cuối
- Hỗ trợ saga để khôi phục lại trạng thái trước
- In an orches- trated saga, a service takes on the role of orchestrator (or coordinator): a process that executes and tracks the outcome of a saga across multiple services. An orchestrator might be an independent service—recall the verb-oriented services from chapter 4 — or a capability of an existing service

#### Problems
- Distributed system: get dữ liệu phải thực hiện nhiều truy vấn. có thể phải dùng một vòng lặp để lấy dữ liệu cho nhiều users --> Hiệu năng giảm
--> Tạo bản copy dữ liệu: Khi user request một order, tạo một bản sao và lưu chung dữ liệu --> lưu dư thừa. Khi update thì phải update nhiều nơi. Tăng performace nhưng tăng complexity

# Chassis
Cross-cutting concerns: tất cả thành phần dùng chung ở mọi service (log, monitor, circuit breaker, health check API, metric, distributed tracing, service registry and discovery, external configuration)
## Chassis Purpose
- Make it easier to onboard team members
- Understand code and tech
- Limit the scope of experimentation
- Adhere to best practices
## Example
- Net core: core framework
- Application insight/HealthChecks: runtime monitoring
- Polly: circuit breaker (nếu service bị lỗi và request vẫn gửi liên tục đến service đến đó thì sẽ ngắt request đến service đó. khác với gửi lại retry vào service lỗi thì vẫn không xử lí được --> nên ngắt request). Ví dụ set nếu gửi 3 lần ko được thì ngắt
??? __Khác với health check?__
k8s heathly check readiness và liveness --> xử lí bên service. circuit breaker chặn request đến service
- Serilog: logging
    + __Why best?__
    + Lưu lịch sử logs
    + Dùng một log service ổn định
    + Cấu hình được lưu ở một vị trí --> How?
- Kong (API gateway): service discovery and registry
- RabbitMQ: communication between microservices
- Docker : optional runtime container

## Summary
- Cho pho phép khởi tạo service nhanh chóng và giảm rủi ro
- Hoàn thiện dần trong quá trình xây dựng
- Đánh giá chọn lực ngôn ngữ, công cụ khi phát triển theo microservice theo mức độ phổ biến, hệ sinh thái
- Đảo bảo phát triển nhanh để thử nghiệm ý tưởng mới