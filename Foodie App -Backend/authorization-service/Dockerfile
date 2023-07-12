FROM openjdk
WORKDIR usr/lib
ENV MYSQL_DATABASE=userAuth
ENV MYSQL_URL=mongodb://localhost:27017/userAuth
ADD ./target/authorization-service-0.0.1-SNAPSHOT.jar /usr/lib/authorization-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","authorization-service-0.0.1-SNAPSHOT.jar"]