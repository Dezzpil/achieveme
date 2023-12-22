#!/usr/bin/env bash

curl --verbose \
 --header "Content-Type: application/json" \
 --header "Project-ID: 2" \
 --header "Project-Key: ZeTw/hflL2LjB0lzvTnzMH3uPX6r/x6RtNF6ZAy1vXE=" \
 --request POST \
 --data '{"username":"xyz","password":"xyz"}' \
 http://localhost:3003/api/data