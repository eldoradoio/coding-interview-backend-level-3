FROM node:20

RUN apt update && apt install -y less man-db sudo

ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

WORKDIR /workspace

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#CMD ["npm", "run", "dev"]
#CMD ["sh"]
CMD ["tail", "-f", "/dev/null"]