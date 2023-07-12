FROM openjdk
WORKDIR usr/lib
ADD ./target/eurekaserver-0.0.1-SNAPSHOT.jar /usr/lib/eurekaserver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","eurekaserver-0.0.1-SNAPSHOT.jar"]