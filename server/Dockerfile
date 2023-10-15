FROM maven:3.8.1-openjdk-17 AS build-stage
WORKDIR /server-todo
COPY . /server-todo/.
RUN mvn -f /server-todo/pom.xml clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /server-todo
COPY --from=build-stage /server-todo/target/*.jar /server-todo/*.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/server-todo/*.jar"]