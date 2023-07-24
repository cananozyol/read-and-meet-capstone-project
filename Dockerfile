FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="canan@readandmeet.neuefische.de"

EXPOSE 8080

ADD backend/target/readandmeet.jar readandmeet.jar

CMD [ "sh", "-c", "java -jar /readandmeet.jar" ]
