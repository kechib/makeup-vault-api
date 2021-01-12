#!/bin/bash

API="https://hidden-spire-04826.herokuapp.com/"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
