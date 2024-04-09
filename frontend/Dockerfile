FROM node:20-buster

RUN mkdir /ExpenseTrackerFrontend
WORKDIR /ExpenseTrackerFrontend
COPY . /ExpenseTrackerFrontend

RUN npm i

EXPOSE 5173

CMD [ "npm", "run", "dev" ]