FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=customer
ENV MONGO_URL=mongodb://localhost:27017/customer
ADD ./target/customer-service-0.0.1-SNAPSHOT.jar /usr/lib/customer-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","customer-service-0.0.1-SNAPSHOT.jar"]