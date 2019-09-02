# use node base image
FROM node

# set the work directory
WORkDIR /code

# copy all the files from current directory (source) to
# work dir in container
COPY . .

# RUN npm install
# RUN npm install forever -g

# open the port 
EXPOSE 4000

# run the server
CMD node server.js

# CMD forever start -l server.log server
