# Nodejs forever!
#
# VERSION               0.0.1

FROM      ubuntu
MAINTAINER Michael Feher <root@PhearZero.com>

RUN apt-get update && apt-get install wget -y

RUN echo deb http://apt.newrelic.com/debian/ newrelic non-free >> /etc/apt/sources.list.d/newrelic.list
RUN wget -O- https://download.newrelic.com/548C16BF.gpg | apt-key add -
RUN apt-get update

RUN apt-get install -y npm node nodejs git newrelic-sysmond
RUN nrsysmond-config --set license_key=6bef7ecc28634601d16b4d4b7dc9577662061fe5

RUN npm install forever -g

RUN git clone https://github.com/PhearZero/phear-reports.git
RUN cd phear-reports && npm install
CMD [nodejs]
