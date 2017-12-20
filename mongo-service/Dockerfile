FROM mongo:latest

RUN mkdir -p /database
RUN mkdir -p /database/db
RUN echo "dbpath = /database/db" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /database/db

COPY mongo-init.js /database/

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /database/db --smallfiles \
    && mongo 127.0.0.1:27017 /database/mongo-init.js \
    && mongod --dbpath /database/db --shutdown \
    && chown -R mongodb /database/db

RUN rm -f /tmp/mongodb-27017.sock

VOLUME /database/db

EXPOSE 27017

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles", "--bind_ip_all"]