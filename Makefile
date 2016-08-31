docker:
	docker build -t tantalic/parse-server:latest .

run: docker
	docker run -d -p 1337:1337 tantalic/parse-server:latest
