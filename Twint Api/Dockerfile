FROM python:3.9

WORKDIR /

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app / 

CMD ["python","server.py"]