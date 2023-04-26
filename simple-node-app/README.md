### Build:

Build the Docker image using the Dockerfile:

```
docker build -t simple-node-app:latest .
```

### Run:

Run the Docker container using the built image:
```
docker run -p 3000:3000 --name simple-node-app simple-node-app:latest
```

### Push:
```
docker tag simple-node-app fabioyyc/simple-node-app:latest

docker push fabioyyc/simple-node-app:latest

```