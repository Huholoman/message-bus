FROM node:buster

RUN mkdir /package
RUN chown node /package
WORKDIR /package

COPY ./package.json .

USER node

CMD ["npm", "install"]
