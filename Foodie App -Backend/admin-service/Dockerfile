FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=productdb
ENV MONGO_URL=mongodb://localhost:27017/admin-service
ADD ./target/admin-0.0.1-SNAPSHOT.jar /usr/lib/admin-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","admin-0.0.1-SNAPSHOT.jar"]
