FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=customer
ENV MONGO_URL=mongodb://localhost:27017/customer
ADD ./target/gateway-service-0.0.1-SNAPSHOT.jar /usr/lib/gateway-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","gateway-service-0.0.1-SNAPSHOT.jar"]