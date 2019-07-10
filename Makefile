.PHONY: default
default: hugo-dev-server

.PHONY: hugo-dev-server
hugo-dev-server:
	hugo server

.PHONY: hugo-build-prod
hugo-build-prod:
	hugo --minify -b $(URL)

.PHONY: build-prod
build-prod: hugo-build-prod uploaded-images-resize


.PHONY: hugo-build-dev
hugo-build-dev:
	hugo

.PHONY: build-dev
build-dev: hugo-build-dev


.PHONY: uploaded-images-resize
uploaded-images-resize:
	scripts/image-resize.sh 'public/uploads/*.jpg'


.PHONY: clean
clean:
	rm -rd public/
	rm -d resources/