# Nodejs forever!
#
# VERSION               0.0.1

FROM      ubuntu
MAINTAINER Michael Feher <root@PhearZero.com>

RUN apt-get update
RUN apt-get install -y npm node nodejs git
RUN npm install forever -g

RUN git clone https://github.com/PhearZero/phear-reports.git
RUN cd phear-reports && npm install
