FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=admin-service
ENV MONGO_URL=mongodb://localhost:27017/admin-service
ADD ./target/search-service-0.0.1-SNAPSHOT.jar /usr/lib/search-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","search-service-0.0.1-SNAPSHOT.jar"]