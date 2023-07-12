FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=favResturantdb
ENV MONGO_URL=mongodb://localhost:27017/favResturantdb
ADD ./target/favouriteServices-0.0.1-SNAPSHOT.jar /usr/lib/favouriteServices-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","favouriteServices-0.0.1-SNAPSHOT.jar"]